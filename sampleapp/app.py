from flask import Flask, render_template, jsonify
import pymongo
import os

# Create an instance of our Flask app.
app = Flask(__name__)
mongo_username = os.getenv('mongo_username')
mongo_password = os.getenv('mongo_password')

uri = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"

with pymongo.MongoClient(uri) as client:
    db = client.natparkapp
    twitterdata = db.twitterData
    geojson = db.geojson
    twittermatching = db.twitterMatching
    parknames_coll = db.parknames

# Set route
@app.route('/')
def index():
    twitter_results = twitterdata.find()
    return_list = []
    for result in twitter_results:
        return_list.append(result)
    return render_template("index.html", return_list=return_list)

# GeoJson Data API
@app.route('/api/v1/parkgeo/<parkname>')
def parkgeo(parkname):
    park_results = geojson.find_one({'parkname':parkname})
    del park_results['_id']
    new_dict = {
        'type':'FeatureCollection',
        'features':[park_results]
    }
    return new_dict

# Park Metadata API
@app.route('/api/v1/parkmeta/<parkname>')
def parkmeta(parkname):
    park_results = geojson.find_one({'parkname':parkname})
    del park_results['_id']
    meta_list = [f"Park Name: {park_results['parkname']}",
        f"State: {park_results['state']}",
        f"Region: {park_results['region']}",
        f"Park Name: {park_results['park_type']}",
        f"Area (square meters): {park_results['area']}",
        f"Park Website: {park_results['park_url']}"]
    return meta_list

# List of park names API
@app.route('/api/v1/allparknames')
def parknames():
    allnames_results = parknames_coll.find()
    parks_list = [(result['state'], result['parkname']) for result in allnames_results if (result['state'], result['parkname'])]
    n = len(parks_list)
    for i in range(n):
        for j in range(n-i-1):
            if parks_list[j][0] > parks_list[j + 1][0]:
                parks_list[j], parks_list[j + 1] = parks_list[j + 1], parks_list[j]
    return jsonify(parks_list)

# twitter data api
@app.route('/api/v1/parktweets/<parkname>')
def tweets_by_parkname(parkname):
    match_data = twittermatching.find(filter = {'park':parkname})
    try:
        handle = match_data[0]['twitter']
        tweet_data = twitterdata.find(filter = {'park.username':handle})
        tweets = tweet_data[0]['mentionData']['data']
        tweet_text = [tweet['text'] for tweet in tweets]
        return tweet_text
    except:
        return ["Error: No Tweets Found"]

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=False)
