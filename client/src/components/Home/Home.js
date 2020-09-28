import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../store/actions/book_actions";
import { RowGenerator, GenerateRows } from "../../utils/helpers";

class Home extends Component {
  componentDidMount(props) {
    let bookList = this.props.book.collection;

    if (bookList) {
      return null;
    } else {
      this.props.dispatch(getBooks(6, 0, "desc"));
    }
  }

  loadmore = () => {
    let bookList = this.props.book.collection;
    let count = bookList.length;
    this.props.dispatch(getBooks(2, count, "desc", bookList));
  };

  showArticles = (book) => {
    if (book.collection) {
      const rowsArray = RowGenerator(book.collection, 2);
      const generateArticles = GenerateRows(rowsArray, "six");
      return generateArticles;
    } else {
      return false;
    }
  };

  render() {
    return this.props.book ? (
      <div className='container'>
        <div className='row articles_container'>
          {this.showArticles(this.props.book)}
        </div>
        <button className='loadmore' onClick={this.loadmore}>
          Load more
        </button>
      </div>
    ) : null;
  }
}

function mapToStateToProps(state) {
  return {
    book: state.books,
  };
}
export default connect(mapToStateToProps)(Home);
