import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string
      })
    }),
    bookShelves: PropTypes.array.isRequired
  };

  render() {
    const { book, bookShelves } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128, height: 193,
                 backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`
               }}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : 'none'}
            >
              <option disabled>Move to...</option>
              {bookShelves.map(bookShelf => (
                <option
                  key={bookShelf.id}
                  value={bookShelf.id}
                >
                  {bookShelf.name}
                </option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
      </div>
    )
  }
}

export default Book
