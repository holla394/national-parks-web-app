from flask import Flask, render_template, jsonify
import pymongo
import logging
import os
# from config import mongo_password

# Create an instance of our Flask app.
app = Flask(__name__)

# export 'mongo'='mongo1'
mongo_password = os.getenv('mongo')

client = pymongo.MongoClient(f"mongodb+srv://sam:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority")
db = client.natparkapp
twitterdata = db.twitterData
geojson = db.geojson

# logging.log(msg='###################################################')
# logging.log(msg='###################################################')
# logging.log(msg='###################################################')
# logging.log(msg='mongo connection successful')
# logging.log(msg='###################################################')
# logging.log(msg='###################################################')
# logging.log(msg='###################################################')

# Set route
@app.route('/')
def index():
    results = twitterdata.find()
    return_list = []
    for result in results:
        return_list.append(result)
    return render_template("index.html", return_list=return_list)


# Set route
@app.route('/api/v1/<parkname>')
def park(parkname):
    results = geojson.find_one({'parkname':parkname})
    del results['_id']
    new_dict = {
        'type':'FeatureCollection',
        'features':[results]
    }
    return new_dict

# get list of park names
@app.route('/api/v1/allparknames')
def parknames():
    results = geojson.find()
    parks_list = [result['parkname'] for result in results if result['parkname']]
    return jsonify(parks_list)

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=True)
