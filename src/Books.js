import React,{Component} from 'react'

export default class Books extends Component {
    ShelfChanger = (e) => {
        const shelf = e.target.value;
        this.props.onShelfChange(this.props.books, shelf);
    };

    render() {
      const {books} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                  <div className="book-cover"
                  style={
                    { width: 128,
                      height: 193,
                      backgroundImage: `url(${books.imageLinks.thumbnail})`
                    }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={this.ShelfChanger} value={books.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{books.title}</div>
                <div className="book-authors">{books.authors}</div>
            </div>
        )
    }
}
