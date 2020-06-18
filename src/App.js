import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBook from './content/ListBooks'
import {Route,Link} from 'react-router-dom'
import Book from './content/Book'

class BooksApp extends React.Component {
  state = {
    query:"",
    showBooks:[],
    books:[],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  //function to update the query
  updateQuery=(query) =>{
    this.setState({query: query})
    let showingBooks = []
        if(query !== ''){
          BooksAPI.search(query).then(resp=>{
            if(!resp || resp.error){
              this.setState({showBooks:[]})
              return
            }

         showingBooks = resp.map(resps => {
                this.state.books.forEach(book => {
                if (book.id === resps.id) resps.shelf = book.shelf
              })
              return resps
            })
        this.setState({showBooks:showingBooks})
      })
    }
    else {
      this.setState({showBooks:[]})
    
    }
  }


  updateShelf = (book, shelf) => {
    let books;
    if (this.state.books.findIndex(b => b.id === book.id) > 0) {
      // change the position of an existing book in the shelf
      books = this.state.books.map(b => {
        if (b.id === book.id) {
          return {...book, shelf}
        } else {
          return b
        }
      })
    } else {
      // add a new book to the shelf
      books = [...this.state.books, {...book, shelf}]
    }

    this.setState({books})

    BooksAPI.update(book, shelf).then((data) => {
      // shelf updated on the server
    })
  }

  render() {
    const{query} = this.state
    return (
      <div className="app">

          <Route exact path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"
                         value={query}
                         onChange={(e) => this.updateQuery(e.target.value)}
                  />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.state.showBooks.map(book => (
                  <Book key={book.id} book={book} onUpdateofBook={(book, shelf) => this.updateShelf(book, shelf)}></Book>
                ))}
                </ol>
              </div>
            </div>
          )} />
          <Route exact path="/" render={() => (
            <ListBook books={this.state.books} onUpdateShelf={(book, shelf) => this.updateShelf(book, shelf)}/>
          )}/>

      </div>
    )
  }
}

export default BooksApp
