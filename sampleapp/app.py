from flask import Flask, render_template, jsonify
import pymongo
import logging
import os
import ssl

# Create an instance of our Flask app.
app = Flask(__name__)

# export 'mongo_username'='project3app'
# export 'mongo_password'='mongo1'
mongo_username = os.getenv('mongo_username')
mongo_password = os.getenv('mongo_password')

uri = "mongodb+srv://project3app:mongo1@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(uri, ssl_cert_reqs=ssl.CERT_NONE)

db = client.natparkapp
twitterdata = db.twitterData
geojson = db.geojson
twittermatching = db.twitterMatching

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
    # del results['_id']
    new_dict = {
        'type':'FeatureCollection',
        'features':[results]
    }
    return new_dict

# get list of park names
# get list of park names
@app.route('/api/v1/allparknames')
def parknames():
    results = geojson.find()
    parks_list = [(result['state'], result['parkname']) for result in results if (result['state'], result['parkname'])]

    n = len(parks_list)
    for i in range(n):
        for j in range(n-i-1):
            if parks_list[j][0] > parks_list[j + 1][0]:
                parks_list[j], parks_list[j + 1] = parks_list[j + 1], parks_list[j]
                
                # for k in range(n-j-1):
                #     if parks_list[j][k] >parks_list[j][k+1]:
                #         parks_list[j][k], parks_list[j][k + 1] = parks_list[j][k + 1], parks_list[j][k]
    # parks_list = [result['parkname'] for result in results if result['parkname']]
    return jsonify(parks_list)

# twitter data api
@app.route('/api/v1/gettweets/<parkname>')
def tweets_by_parkname(parkname):
    match_data = twittermatching.find(filter = {'park':parkname})
    try:
        handle = match_data[0]['twitter']
        tweet_data = twitterdata.find(filter = {'park.username':handle})
        # result_count = tweet_data[0]['mentionData']['meta']
        tweets = tweet_data[0]['mentionData']['data']
        tweet_text = [tweet['text'] for tweet in tweets]
        return tweet_text
    except:
        return "Error: No Tweets Found :("

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=True)
