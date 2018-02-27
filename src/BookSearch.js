import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from "./BooksAPI";
import Book from './Book'
import sortBy from "sort-by";

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookShelves: PropTypes.array.isRequired,
    onBookMove: PropTypes.func.isRequired
  };

  state = {
    query: '',
    searchBooks: []
  };

  getBooks = (query) => {
    this.setState({ query: query });

    if (query) {
      BooksAPI.search(query.trim()).then(
        books => {
          if (books && books.length > 0) {
            this.setState(
              { searchBooks: books.sort(sortBy('title')).map(
                book => {
                  for (const savedBook of this.props.books) {
                    if (book.id === savedBook.id) {
                      book.shelf = savedBook.shelf;
                      return book
                    }
                  }
                  return book
                })
              })
          } else {
            this.setState({ searchBooks: [] })
          }
        }
      );
    } else {
      this.setState({ searchBooks: [] })
    }
  };

  render() {
    const { query, searchBooks } = this.state;
    const { bookShelves, onBookMove } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.getBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query && searchBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  bookShelves={bookShelves}
                  onBookMove={onBookMove}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
