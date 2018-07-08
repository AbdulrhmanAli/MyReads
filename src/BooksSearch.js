import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Books from './Books';
import React,{ Component } from 'react'

export default class BooksSearch extends Component {

        state = {
            query:[]
        }

        SearchforBook= (e)=> {
          if(!e || e ==='') {
            this.setState({query: []});
            return;
          }

        BooksAPI.search(e).then((query) => {
                   if (!query || query.error){
                       this.setState({query: []});
                         return;
                     } else {
                         query  = query.map((book) => {
                         let isBookOnShefl = this.props.allbooks.find((b) => b.id === book.id);
                         if (isBookOnShefl) {
                           book.shelf = isBookOnShefl.shelf
                         } else {
                           book.shelf =  "none";
                         }
                         return book;
                       });
           this.setState({query});
                        }
       })
     }

        render() {

            return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange = {(event) =>
                           this.SearchforBook(event.target.value) }
                         placeholder="Search by title or author"/>
                    </div>
                        </div>
                          <div className="search-books-results">
                  <ol className="books-grid">
                  {console.log(this.state.query)}
                  {this.state.query && this.state.query.map((book, index) => (
                            <li key={book.id + index}>
                                <Books books={book}
                                onShelfChange={this.props.onShelfChange}/>
                            </li>
                        ))}
                  </ol>
                    </div>
                </div>
              )
            }
        }
