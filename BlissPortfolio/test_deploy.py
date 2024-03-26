import requests
import pytest
from flask import Flask



ENDPOINT = 'https://test.btschwartz.com/portfolio'

# make a test that just fetches the endpoint and makes sure it is up
def test_app_starts():
    rv = requests.get(ENDPOINT) 
    assert rv.status_code == 200