from config import bearer_token
import os
import json
import requests

# not used but another way of getting bearer token if you run:
# export 'BEARER_TOKEN'='<your_bearer_token>'

bearer_token = os.environ.get("BEARER_TOKEN")
USER_NAME = 'SamuelLJackson'
main_url = f'https://api.twitter.com/2/users/by/username/{USER_NAME}'

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

def getID(USER_NAME):
    search_url = f'https://api.twitter.com/2/users/by/username/{USER_NAME}'
    json_response = connect_to_endpoint(search_url)
    return json_response['data']['id']

def main():
    json_response = connect_to_endpoint(main_url)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()

