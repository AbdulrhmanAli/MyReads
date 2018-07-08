import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf'
import BooksSearch from './BooksSearch'
import {Route} from 'react-router-dom'
import './App.css'

export default class BooksApp extends Component {
     state = {
     books :[]
  }

        componentDidMount(){
          BooksAPI.getAll().then((book)=>{
            this.setState({books:book})
          })
        }

        ShelfChange = (book, shelf) => {
          book.shelf = shelf
          this.setState(state => ({
            books: this.state.books.filter(books => books.id !== book.id).concat([book])
          }))
          BooksAPI.update(book, shelf)
        }
    render() {
      const CurrentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading');
      const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead');
      const read = this.state.books.filter((book) => book.shelf === 'read');

    return (
          <div className="app">
              <Route exact path="/" render={() => (
                  <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                      <BooksShelf
                      onShelfChange= {this.ShelfChange}
                      allbooks ={CurrentlyReading}
                      title={'Currently Reading'}/>
                      <BooksShelf
                      onShelfChange={this.ShelfChange}
                      allbooks ={wantToRead}
                      title={'Want To Read'}/>
                      <BooksShelf onShelfChange={this.ShelfChange}
                      allbooks ={read}
                      title={'Read'}/>
                    </div>
                    </div>
              )}/>
          <Route path="/search" render={({history}) => (
            <BooksSearch
            onShelfChange={this.ShelfChange}
            allbooks={this.state.books}
            history={history}/>)}/>
          </div>
    )
  }
}
