from selenium import webdriver
from pymongo import MongoClient
from bs4 import BeautifulSoup

options = webdriver.FirefoxOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
browser = webdriver.Firefox(options=options)

client = MongoClient("mongodb://localhost:27017")
db = client.bookDB
books_collection = db.books
MAX_PAGES = 22
WEB_URL_PREFIX = "https://www.goodreads.com"
WEB_URL = WEB_URL_PREFIX + "/list/show/7616.Motivational_and_Self_Improvement_Books"
page_number = 1

print("Script created by: Alex Kovacs\n")
print("Scraping website " + WEB_URL_PREFIX)

def loadPage(url):
    browser.get(url)
    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')
    return soup

def siteLoader():
    query = "?page=" + str(page_number)
    document = loadPage(WEB_URL + query)
    table = document.find("div", {"id": "all_votes"})
    if page_number <= MAX_PAGES:
        print("[INFO] Currently on page: " + str(page_number))
        storeBooks(table)

def storeBooks(table):
    global page_number
    # find all books
    book_container = table.find_all("tr")
    for book in book_container:
        url = book.find("a", {"class": "bookTitle"})['href']

        # Check if exists and don't waste perfomance
        if books_collection.count_documents({"book_url": WEB_URL_PREFIX + url}) > 0:
            print("[INFO] Book already exists! Skipping...")
            continue

        single_book = loadPage(WEB_URL_PREFIX + url)
        
        # extract stores
        stores = []
        if single_book.find("div", {"id":"buyDropButtonStores"}):
            store_links = single_book.find("div", {"id":"buyDropButtonStores"}).find("div").find_all("a")
            for store in store_links:

                stores.append({
                    "store_name": store.text,
                    "store_book_url": WEB_URL_PREFIX + store['href']
                })

        #conditional data extraction
        image = {
            "url": "",
            "alt": "",
        }
        if single_book.find("img", {"id":"coverImage"}):
            image["url"] = single_book.find("img", {"id":"coverImage"})['src']
            image["alt"] = single_book.find("img", {"id":"coverImage"})['alt'].strip()

        isbn = ""
        if single_book.find("span", {"itemprop": "isbn"}):
            isbn = single_book.find("span", {"itemprop": "isbn"}).text.strip()

        language = ""
        if single_book.find("div", {"itemprop": "inLanguage"}):
            language = single_book.find("div", {"itemprop": "inLanguage"}).text.strip()
        
        description = ""
        if single_book.find("div", {"id": "description"}):
            if len(single_book.find("div", {"id": "description"}).find_all('span')) > 1:
                description = single_book.find("div", {"id": "description"}).find_all('span')[1].decode_contents()
            else:
                description = single_book.find("div", {"id": "description"}).find_all('span')[0].decode_contents()
        
        author_bio = ""
        if single_book.find("div", {"class": "bookAuthorProfile__about"}):
            if len(single_book.find("div", {"class": "bookAuthorProfile__about"}).find_all('span')) > 1:
                author_bio = single_book.find("div", {"class": "bookAuthorProfile__about"}).find_all('span')[1].decode_contents()
            else:
                author_bio = single_book.find("div", {"class": "bookAuthorProfile__about"}).find_all('span')[0].decode_contents()

        book_format = ""
        if single_book.find("span", {"itemprop": "bookFormat"}):
            book_format = single_book.find("span", {"itemprop": "bookFormat"}).text.strip()

        book_pages = ""
        if single_book.find("span", {"itemprop": "numberOfPages"}):
            book_pages = single_book.find("span", {"itemprop": "numberOfPages"}).text.strip()
        
        meta = {
            "rating_value": "",
            "rating_count": "",
            "review_count": ""
        }
        if single_book.find("span", {"itemprop":"ratingValue"}):
            meta["rating_value"] = single_book.find("span", {"itemprop":"ratingValue"}).text.strip()
        if single_book.find("meta", {"itemprop":"ratingCount"}):
            meta["rating_count"] = single_book.find("meta", {"itemprop":"ratingCount"})['content']
        if single_book.find("meta", {"itemprop":"reviewCount"}):
            meta["review_count"] = single_book.find("meta", {"itemprop":"reviewCount"})['content']

        # extract author books
        author_books = []
        if single_book.find("div", {"id":"aboutAuthor"}):
            author_books_container = single_book.find("div", {"id":"aboutAuthor"}).find_next_sibling("div").find("div", {"class": "js-dataTooltip"})
            if author_books_container:
                author_books_list = author_books_container.find_all("div")
                if len(author_books_list) > 0:
                    for book in author_books_list:
                        author_books.append({
                            "title": book.find("img")["alt"],
                            "url": WEB_URL_PREFIX + book.find("a")["href"],
                            "image": book.find("img")["src"]
                        })

        # collate book data
        book_data = {
            "title": single_book.find("h1", {"id": "bookTitle"}).text.strip(),
            "author": {
                "name": single_book.find("a", {"class": "authorName"}).text.strip(),
                "followers": single_book.find("div", {"class": "bookAuthorProfile__followerCount"}).text.strip(),
                "bio": author_bio,
                "author_url": single_book.find("a", {"class": "authorName"})['href'],
                "books_from_author": author_books
            },
            "book_url": WEB_URL_PREFIX + url,
            "description": description,
            "image": image,
            "meta": meta,
            "stores": stores,
            "book_format": book_format,
            "pages": book_pages,   
            "book_data": {
                "ISBN": isbn,
                "language": language,
            }         
        }

        books_collection.insert_one(book_data)
        print("[INFO] Book: " + url + " collected! :)")
        

    page_number += 1
    siteLoader()

def run():
    siteLoader()

run()

    
