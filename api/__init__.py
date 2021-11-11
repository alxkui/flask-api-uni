from flask import Flask
from flask.helpers import make_response
from flask.json import jsonify
from api.dbconn import books_collection

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysp3c1als3cr3tthatn00n3w1ll3v3rkn0w'
VERSION = 'v1'
PREFIX = '/api/' + VERSION

# GET root
@app.route(PREFIX + '/', methods=['GET'])
def root():
    all_books = []
    for book in books_collection.find():
        book['_id'] = str(book['_id'])
        all_books.append({
            "title": book['title'],
            "url": PREFIX + '/books/' + book['_id']
        })
    return make_response( jsonify({
        "message": "Welcome to my motivational and self help books API",
        "created_by": "Alex Kovacs",
        "version_no": VERSION,
        "stored_books": str(books_collection.count_documents({})),
        "books": all_books
    }), 200 )

import api.routes.auth
import api.routes.books

