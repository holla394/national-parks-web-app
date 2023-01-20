from flask import Flask, render_template
import pymongo
import os

# Create an instance of our Flask app.
app = Flask(__name__)

# export 'mongo'='<my mongo password>'
mongo_password = os.getenv('mongo')

client = pymongo.MongoClient(f"mongodb+srv://sam:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority")
db = client.natparkapp
collection = db.twitterData


# Set route
@app.route('/')
def index():
    return collection


if __name__ == "__main__":
    app.run(debug=True)
