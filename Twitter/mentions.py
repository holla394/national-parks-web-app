from config import bearer_token
import os
import json
import requests
from users import getID

bearer_token = os.environ.get("BEARER_TOKEN")
search_url = f'https://api.twitter.com/2/users/{getID("YellowstoneNPS")}/mentions'

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentTweetCountsPython"
    return r


def connect_to_endpoint(url):
    response = requests.request("GET", url, auth=bearer_oauth)
    # print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()

def getMentions(USER_NAME):
    search_url = f'https://api.twitter.com/2/users/{getID(USER_NAME)}/mentions'
    json_response = connect_to_endpoint(search_url)
    return json_response

def main():
    json_response = connect_to_endpoint(search_url)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()

