import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import AdminLayout from "../../../../HOC/adminLayout";

import { BookSchema, FormElement } from "./utils/postsHelper";

import Modal from "@material-ui/core/Modal";

// DRATF JS
import "draft-js/dist/Draft.css";
import RichTextEditor from "./RichTextEditor";
import { connect } from "react-redux";
import {
  clearBook,
  editBook,
  getBook,
} from "../../../../store/actions/book_actions";

class EditPost extends Component {
  state = {
    editorState: "",
    editorContentHtml: "",
    success: false,
    loading: true,
    bookToEdit: {},
    open: false,
  };

  onEditorStateChange = (value) => {
    this.setState({
      editorState: value,
      editorContentHtml: value,
      submitted: false,
    });
  };

  onEditBook = (values) => {
    this.props.dispatch(editBook(values));
  };

  componentDidUpdate(prevProps) {
    const hasChanged = this.props.books.single !== prevProps.books.single;
    const hasUpdated = this.props.books.update !== prevProps.books.update;
    const single = this.props.books.single;
    const content = this.props.books.single.content;
    const editorState = this.state.editorState;

    if (hasUpdated) {
      this.setState({
        success: true,
        editorState: this.state.editorContentHtml,
      });
    }

    if (hasChanged) {
      if (single !== false) {
        this.setState({
          loading: false,
          editorState: this.state.editorContentHtml,
          bookToEdit: {
            _id: single._id,
            name: single.name,
            author: single.author,
            pages: single.pages,
            rating: single.rating,
            price: single.price,
          },
        });
      } else {
        this.props.history.push("/");
      }
    }

    //----------------------------------------------------
    // TODO: Pendiente de refactor.
    if (single && editorState === "") {
      this.setState({
        editorState: content,
        editorContentHtml: content,
      });
    }
    //----------------------------------------------------
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  componentDidMount() {
    /// FETCH BOOK
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  // MODAL
  handleOpen() {
    this.setState({
      open: true,
    });
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const singleContent = this.props.books.single;

    return this.state.loading ? (
      <p>loading ..</p>
    ) : (
      <AdminLayout>
        <h4>Edit post</h4>

        <Formik
          initialValues={this.state.bookToEdit}
          validationSchema={BookSchema}
          onSubmit={(values) => {
            this.onEditBook({
              ...values,
              content: this.state.editorContentHtml,
            });
            this.setState({
              open: true,
            });
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <input type='hidden' name='_id' value={values._id} />
              <FormElement
                elData={{ element: "input", type: "text", value: values.name }}
                placeholder='The title of the book'
                name='name'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.name}
                touched={touched.name}
              />

              <RichTextEditor
                onEditorStateChange={this.onEditorStateChange.bind(this)}
                reset={this.state.submitted}
                //----------------------------------------------------
                // TODO: Pendiente de refactor.
                singleContent={singleContent} // this.props.books.single.content
                //----------------------------------------------------
              />

              <h4>Book info</h4>

              <FormElement
                elData={{
                  element: "input",
                  type: "text",
                  value: values.author,
                }}
                placeholder="The author's name"
                name='author'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.author}
                touched={touched.author}
              />

              <FormElement
                elData={{
                  element: "input",
                  type: "number",
                  value: values.pages,
                }}
                placeholder='How many pages'
                name='pages'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.pages}
                touched={touched.pages}
              />

              <FormElement
                elData={{ element: "select", value: values.rating }}
                name='rating'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.rating}
                touched={touched.rating}>
                <option default>Select a rating</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </FormElement>

              <FormElement
                elData={{
                  element: "input",
                  type: "number",
                  value: values.price,
                }}
                placeholder='What is the price ?'
                name='price'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.price}
                touched={touched.price}
              />

              <button type='submit'>Edit book</button>
              <br />

              {this.state.success && this.props.books ? (
                <Modal
                  open={this.state.open}
                  onClose={this.handleClose.bind(this)}
                  aria-labelledby='simple-modal-title'
                  aria-describedby='simple-modal-description'>
                  <div className='succes_entry' classes={{}}>
                    <div>Update completed</div>
                    <Link to={`/article/${this.props.books.update.doc._id}`}>
                      See your book
                    </Link>
                  </div>
                </Modal>
              ) : null}
            </form>
          )}
        </Formik>
      </AdminLayout>
    );
  }
}
function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps)(EditPost);
