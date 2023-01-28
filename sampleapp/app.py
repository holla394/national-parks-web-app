from flask import Flask, render_template, jsonify
import pymongo
import logging
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

# Set route
@app.route('/api/v1/<parkname>')
def park(parkname):
    park_results = geojson.find_one({'parkname':parkname})
    del park_results['_id']
    new_dict = {
        'type':'FeatureCollection',
        'features':[park_results]
    }
    return new_dict

# get list of park names
@app.route('/api/v1/allparknames')
def parknames():
    # allnames_results = []
    # for i in range(0,429):
    #     x = parknames.find_one({'parknumber':i})
    #     print(x['parkname'], "\n",x['state'],"\n\n\n")
    #     allnames_results.append({"parkname":x['parkname'],'state':x['state']})
    allnames_results = parknames_coll.find()
    parks_list = [(result['state'], result['parkname']) for result in allnames_results if (result['state'], result['parkname'])]
    n = len(parks_list)
    for i in range(n):
        for j in range(n-i-1):
            if parks_list[j][0] > parks_list[j + 1][0]:
                parks_list[j], parks_list[j + 1] = parks_list[j + 1], parks_list[j]
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
        return ["Error: No Tweets Found :(","HAHAHAHAHAHAHAH YOU SUCK!!!!","NO TWEETS FOR UUUUU"]

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=False)
