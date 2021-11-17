from api import app, PREFIX
from flask import jsonify, make_response, request
from api.dbconn import books_collection
from bson import ObjectId
from api.routes.auth import jwt_required

# GET all books
@app.route(PREFIX + '/books', methods=['GET'])
def all_books():
	page_num, page_size = 1, 10
	if request.args.get('pn'):
		page_num = int(request.args.get('pn'))
	if request.args.get('ps'):
		page_size = int(request.args.get('ps'))
	page_start = (page_size * (page_num - 1))

	all_books = []
	for book in books_collection.find().skip(page_start).limit(page_size):
		book['_id'] = str(book['_id'])
		all_books.append(book)

	return make_response(jsonify(all_books), 200)

# GET single book
@app.route(PREFIX + '/books/<string:id>', methods=['GET'])
def single_book(id):
	book = books_collection.find_one({'_id': ObjectId(id)})
	if book is not None:
		book['_id'] = str(book['_id'])
		return make_response( jsonify(book), 200 )
	else:
		return make_response( jsonify({"error": "Invalid book ID"}), 404 )
	
