import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Books from './Books';
export default class BooksShelf extends Component {

  render() {
    
      const { onShelfChange } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {this.props.allbooks.map((res)=>{
                      return(
                      <li key = {res.id}>
                      <Books books={res} onShelfChange={onShelfChange} />
                      </li>)})}
                      </ol>
                    <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
                </div>
            </div>
            )
      }
}
