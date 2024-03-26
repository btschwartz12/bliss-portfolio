import pytest
from flask import Flask


from .app import app # Replace with the name of your app
ENDPOINT = '/portfolio/'  # Replace with the endpoint you want to test

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_app_starts(client):
    rv = client.get(ENDPOINT) 
    assert rv.status_code == 200 

# Add more tests here if you want