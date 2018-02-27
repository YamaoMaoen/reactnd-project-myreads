import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    bookShelves: [
      {
        'id': 'currentlyReading',
        'name': 'Currently Reading'
      },
      {
        'id': 'wantToRead',
        'name': 'Want to Read'
      },
      {
        'id': 'read',
        'name': 'Read'
      }
    ],
    books: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  };

  moveBook = (movedBook, bookShelf) => (
    this.setState({
      books: this.state.books.map(book => {
        BooksAPI.update(movedBook, bookShelf);
        if (book.id === movedBook.id) {
          return Object.assign({}, book, {
            shelf: bookShelf
          });
        } else {
          return book;
        }
      }),
    })
  );

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <BookSearch
            books={this.state.books}
            bookShelves={this.state.bookShelves}
            onBookMove={this.moveBook}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.bookShelves.map(bookShelf => (
                  <BookShelf
                    key={bookShelf.id}
                    name={bookShelf.name}
                    books={this.state.books.filter(book => (book.shelf === bookShelf.id))}
                    bookShelves={this.state.bookShelves}
                    onBookMove={this.moveBook}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
