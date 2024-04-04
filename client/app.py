import os
import openai
import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import tensorflow as tf
from flask import Flask, jsonify
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


app = Flask(__name__)
CORS(app)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('openai_api_key')
os.environ["TOKENIZERS_PARALLELISM"] = "False"
# llm = OpenAI(openai_api_key=openai_api_key, temperature=0)
llm = ChatOpenAI(openai_api_key=os.environ["OPENAI_API_KEY"], temperature=0.1, model="gpt-3.5-turbo")

translator = Translator()

@app.route('/chatbot/<string:instruction>/<string:source>/<string:des>', methods = ['POST'])
def chatgpt_call(instruction, source, des, ch):
#     memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
#     embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
#     db = Chroma(persist_directory="db", embedding_function=embeddings, client_settings=CHROMA_SETTINGS)
    
#     retriever = db.as_retriever()
#     qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory = memory)

#     l = translator.detect(instruction)
#     if (source != des):
#         if (l.lang != source):
#             raise Exception("Wrong language")
#         else:
#             instruction = translator.translate(instruction, src = source, dest = des)
#         instruction = instruction.text
# #  print(instruction)
#     # qa = qa_llm()
#     # generated_text = qa(instruction)
#     # answer = generated_text['result']
#     generated_text = qa({"question": instruction})
#     answer = generated_text['answer']
#     ans = {
#         "Answer": answer
#     }
    l = translator.detect(instruction)
    if (source != des):
        if (l.lang != source):
            raise Exception("Wrong language")
        else:
            instruction = translator.translate(instruction, src = source, dest = des)
        instruction = instruction.text
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": instruction}]
    )
    answer = response.choices[0].message["content"]
    ans = {
        "Answer": answer           
    }
    # elif (ch == 1):
    #     response = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo",
    #         messages=[{"role": "user", "content": instruction}]
    #     )
    #     answer = response.choices[0].message["content"]
    #     answer_l = translator.detect(answer)
    #     if (answer_l.lang != 'hi'):
    #         answer_hin = translator.translate(answer, src = source, dest = 'hi')
    #         ans = {
    #             "Answer": answer,
    #             "Hindi" : answer_hin.text
    #         }
    #     else:
    #         ans = {
    #         "   Answer": answer
    #         }
    print(ans)
    return ans

if __name__ == "__main__":
   app.run(debug = True)