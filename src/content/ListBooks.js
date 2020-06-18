import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class ListBook extends Component{

	// to change the shelf and updating
	updateofBook = (book, shelf) => {
    this.props.onUpdateShelf(book, shelf)
  }

	render(){
		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
             <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { this.props.books.filter(book => book.shelf === 'currentlyReading')
                  .map(book => (
                    <Book key={book.id} book={book} onUpdateofBook={(book, shelf) => this.updateofBook(book, shelf)}></Book>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { this.props.books.filter(book => book.shelf === 'wantToRead')
                  .map(book => (
                    <Book key={book.id} book={book} onUpdateofBook={(book, shelf) => this.updateofBook(book, shelf)}></Book>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { this.props.books.filter(book => book.shelf === 'read')
                  .map(book => (
                    <Book key={book.id} book={book} onUpdateofBook={(book, shelf) => this.updateofBook(book, shelf)}/>
                  ))}
              </ol>
            </div>
          </div>
</div>
             </div>
            <div className="open-search">
              <Link className="open-search button1"to="/search">Add a book</Link>
            </div>
          </div>
			)
	}
}

export default ListBook;