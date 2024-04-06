import os
import ast
import openai
import json
import re
import pandas as pd
import numpy as np
import easyocr
from sklearn.neighbors import KNeighborsClassifier
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain.chat_models import ChatOpenAI
import pickle
from googletrans import Translator
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA, ConversationalRetrievalChain, LLMChain
from constants import CHROMA_SETTINGS 
from dotenv import load_dotenv
from PIL import Image
import matplotlib.image as mpimg
import pytesseract
from pytesseract import Output

from keras.applications import efficientnet
from keras.applications.efficientnet import preprocess_input
from tensorflow.keras import models
import numpy as np
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import httpcore

setattr(httpcore, 'SyncHTTPTransport', 'AsyncHTTPProxy')
app = Flask(__name__)
CORS(app)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('openai_api_key')
os.environ["TOKENIZERS_PARALLELISM"] = "False"
# llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
llm = ChatOpenAI(openai_api_key=os.environ["OPENAI_API_KEY"], temperature=0.1, model="gpt-3.5-turbo")

translator = Translator()

classes = ['All Beauty',
 'All Electronics',
 'Appliances',
 'Arts, Crafts & Sewing',
 'Automotive',
 'Baby',
 'Baby Products',
 'Beauty',
 'Cell Phones & Accessories',
 'Clothing, Shoes & Jewelry',
 'Electronics',
 'Grocery & Gourmet Food',
 'Health & Personal Care',
 'Industrial & Scientific',
 'Musical Instruments', 
 'Office Products',
 'Patio, Lawn & Garden',
 'Pet Supplies',
 'Sports & Outdoors',
 'Tools & Home Improvement',
 'Toys & Games']

model = load_model('client/model.h5')
reader= easyocr.Reader(['en'],gpu=False)

@app.route('/chatbot/<string:instruction>/<string:source>/<string:des>', methods = ['GET', 'POST'])
def chatgpt_call(instruction, source, des):
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(persist_directory="db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    
    retriever = db.as_retriever()
    qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory = memory)

    l = translator.detect(instruction)
    if (source != des):
        if (l.lang != source):
            raise Exception("Wrong language")
        else:
            instruction = translator.translate(instruction, src = source, dest = des)
        instruction = instruction.text
#  print(instruction)
    # qa = qa_llm()
    # generated_text = qa(instruction)
    # answer = generated_text['result']
    generated_text = qa({"question": instruction})
    answer = generated_text['answer']
    ans = {
        "Answer": answer
    }
    # l = translator.detect(instruction)
    # if (source != des):
    #     if (l.lang != source):
    #         raise Exception("Wrong language")
    #     else:
    #         instruction = translator.translate(instruction, src = source, dest = des)
    #     instruction = instruction.text
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "user", "content": instruction}]
    # )
    # answer = response.choices[0].message["content"]
    # ans = {
    #     "Answer": answer           
    # }
    print(ans)
    return ans

def read_image(filename):
    img = load_img(filename, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x

@app.route('/predict/<string:file_path>',methods=['GET', 'POST'])
def classify(file_path):
    file_path = file_path.replace('$', '/')
    print(file_path)
    img = mpimg.imread(file_path)
    # text = pytesseract.image_to_string(img,lang='eng')
    results=reader.readtext(file_path)
    text = ""
    for detection in results:
        text += " " + detection[1]
    if (len(text) > 100):
        print(text)
        prompt = "You are an AI assistant and answer the question as a finance expert. Read the given text extracted from a bill image and return the following in a list: Receiver, Total Amount without currency symbol (Sum of all amount), Category, Items. the categories can be either of : ['All Beauty', 'Appliances', 'Arts, Crafts & Sewing', 'Automotive', 'Baby Products', 'Beauty Products', 'Cell Phones & Accessories', 'Clothing, Shoes & Jewelry', 'Electronics', 'Grocery & Gourmet Food', 'Health & Personal Care',  'Musical Instruments', 'Patio, Lawn & Garden', 'Pet Supplies', 'Sports & Outdoors', 'Toys & Games', 'Beverages'], categorize all items into a single and just return 4 things in a dictionary with keys as receiver, totalAmount, category, items. if you are not able to find any of the keys then return None for that. User: "+text
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        answer = response.choices[0].message["content"]
        # print(answer)
        answer = json.loads(answer)
        print(answer)
        print(type(answer))
        ans = {
            "category": list(answer.values())[2],
            "receiver": list(answer.values())[0],
            "amount": list(answer.values())[1],
            "description":  list(answer.values())[3]    
        }
    else:
        img = read_image(file_path) #prepressing method
        class_prediction=model.predict(img) 
        classes_x=np.argmax(class_prediction[0])
        # confidence = str(class_prediction[0][classes_x])
        pred = classes[classes_x]
        ans = {
            "category" : pred,
            "description" : None,
            "receiver": None,
            "amount": None      
        }
    print(ans)
    return ans

@app.route('/market/<string:company>', methods = ['GET', 'POST'])
def news_summariser(company):
    data = request.json
    text = data.get('text', '')
    instruction = "You are an AI assistant and answer the question as a finance expert. Don't reply with anything other than the answer. User: "+text+" \nHere are the recent news about "+company+", now summarise them to show the overall important implications on the market and its effects."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": instruction}]
    )
    answer = response.choices[0].message["content"]
    ans = {
        "summary": answer           
    }
    print(ans)
    return ans

if __name__ == "__main__":
   app.run(debug = True)