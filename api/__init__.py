from flask import Flask
from flask.helpers import make_response
from flask.json import jsonify
from api.dbconn import books_collection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'mysp3c1als3cr3tthatn00n3w1ll3v3rkn0w'
VERSION = 'v1'
PREFIX = '/api/' + VERSION

# GET root
@app.route(PREFIX + '/', methods=['GET'])
def root():
    return make_response( jsonify({
        "message": "Welcome to my motivational and self help books API",
        "created_by": "Alex Kovacs",
        "version_no": VERSION,
        "stored_books": str(books_collection.count_documents({})),
    }), 200 )

import api.routes.auth
import api.routes.books

