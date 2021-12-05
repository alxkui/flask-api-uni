import re
from api import app, PREFIX
from bson import ObjectId
from flask import jsonify, make_response, request
from api.dbconn import books_collection
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

	searchTerm = request.args.get('s')
	if searchTerm:
		regex = re.compile(searchTerm, re.IGNORECASE)
		for book in books_collection.find({ "title": regex }).limit(10):
			book['_id'] = str(book['_id'])
			all_books.append(book)

		return make_response(jsonify(all_books), 200)
		
	
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
	
