from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, DirectoryLoader, PDFMinerLoader
from langchain.embeddings import SentenceTransformerEmbeddings, HuggingFaceEmbeddings
from langchain.vectorstores import Chroma, FAISS
import os 
from langchain.embeddings.openai import OpenAIEmbeddings
from constants import CHROMA_SETTINGS


persist_directory = "client/db"
# DATA_PATH = 'docs/'
# DB_FAISS_PATH = 'vectorstores/db_faiss'

# def create_vector_db():
#     loader = DirectoryLoader(DATA_PATH,
#                              glob = '*.pdf',
#                              loader_cls = PyPDFLoader)
#     documents = loader.load()
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 50)
#     texts = text_splitter.split_documents(documents)
#     embeddings = HuggingFaceEmbeddings(model_name = 'intfloat/multilingual-e5-large',
#                                        model_kwargs = {'device' : 'cpu'})
#     db = FAISS.from_documents(texts, embeddings)
#     db.save_local(DB_FAISS_PATH)
def main():
    for root, dirs, files in os.walk("/Users/ajitbasak/kuberx/client/docs"):
        for file in files:
            if file.endswith(".pdf"):
                print(file)
                loader = PDFMinerLoader(os.path.join(root, file))
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    
    texts = text_splitter.split_documents(documents)
    #create embeddings here
    
    # embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
    embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma.from_documents(texts, embeddings, persist_directory=persist_directory, client_settings=CHROMA_SETTINGS)
    db.persist()
    db=None

if __name__ == "__main__":
    # create_vector_db()
    main()
