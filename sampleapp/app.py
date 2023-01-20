from flask import Flask, render_template
import pymongo
import os
from config import mongo_password

# Create an instance of our Flask app.
app = Flask(__name__)

# export 'mongo'='<my mongo password>'
# mongo_password = os.getenv('mongo')

client = pymongo.MongoClient(f"mongodb+srv://sam:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority")
db = client.natparkapp
twitterdata = db.twitterData


# Set route
@app.route('/')
def index():
    results = twitterdata.find()
    return_list = []
    for result in results:
        return_list.append(result)
    return render_template("index.html", return_list=return_list)

if __name__ == "__main__":
    app.run(debug=True)
