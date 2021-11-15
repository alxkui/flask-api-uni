export interface Book {
    id: String,
    title: String,
    book_url: String,
    description: String,
    book_format: String,
    pages: String,
    author: Author,
    image: BookImage,
    stores: Store[],
    book_data: BookData,
}

export interface Author {
    name: String,
    followers: String,
    bio: String,
    author_url: String,
    books_form_author: BooksFromAuthor[],
    meta: BookImage,
}

export interface BooksFromAuthor {
    title: String,
    url: String,
    image: String
}

export interface BookImage {
    url: String,
    alt: String,
}

export interface BookMeta {
    rating_value: String,
    rating_count: String,
    review_count: String
}

export interface Store {
    store_name: String,
    store_book_url: String,
}

export interface BookData {
    ISBN: String,
    langauge: String,
}