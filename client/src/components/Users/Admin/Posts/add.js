import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import AdminLayout from "../../../../HOC/adminLayout";
import { FormElement, BookSchema } from "./utils/postsHelper";

// DRATF JS
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import RichTextEditor from "./RichTextEditor";

import { connect } from "react-redux";
import { addBook } from "../../../../store/actions/book_actions";

class AddPosts extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    editorContentHtml: "",
    success: false,
    submitted: false,
  };

  onEditorStateChange(value) {
    this.setState({
      editorContentHtml: value,

      submitted: false,
    });
  }

  onPostBook = (values) => {
    this.props.dispatch(addBook(values));
  };
  render() {
    return (
      <AdminLayout>
        <h4>Add a post</h4>
        <Formik
          initialValues={{
            name: "",
            author: "",
            pages: "",
            rating: "",
            price: "",
          }}
          validationSchema={BookSchema}
          onSubmit={(values, { resetForm }) => {
            this.onPostBook({
              ...values,
              content: this.state.editorContentHtml,
            });
            resetForm({});
            this.setState({
              editorState: EditorState.createEmpty(),
              submitted: true,
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
              />
              <h4>Book info</h4>
              <FormElement
                elData={{
                  element: "input",
                  type: "text",
                  value: values.author,
                }}
                placeholder='The author name'
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
                placeholder='Number of pages'
                name='pages'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.pages}
                touched={touched.pages}
              />
              <FormElement
                elData={{
                  element: "select",
                  value: values.rating,
                }}
                name='rating'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.rating}
                touched={touched.rating}>
                <option default> Select a rating</option>
                <option value='1'> 1</option>
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
                placeholder='Price'
                name='price'
                onHandleChange={(e) => handleChange(e)}
                onHandleBlur={(e) => handleBlur(e)}
                errors={errors.price}
                touched={touched.price}
              />
              <button type='submit'> Add book</button>
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
export default connect(mapStateToProps)(AddPosts);
