import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/user_actions";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too short")
    .max(12, "Too long")
    .required("Required!")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  email: Yup.string().email("Invalid email").required("Required"),
});

class Login extends Component {
  state = {
    success: false,
    validation: false,
  };

  static getDerivedStateFromProps(props, state) {
    const auth = props.user.auth;
    if (auth) {
      return {
        success: auth ? true : false,
      };
    }
    return null
  }

  componentDidUpdate() {
    if (this.state.success) {
      this.props.history.push("/admin");
    }
  }
  
  render() {
    return (
      <div className='container form_container'>
        <h1>Welcome back</h1>
        <hr />
        <h4>Sing in here:</h4>
        <Formik
          initialValues={{
            email: "francis@gmail.com",
            password: "Password123!",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            this.props.dispatch(loginUser(values)).then((response) => {
              if (!this.props.user.auth) {
                this.setState({
                  validation: true,
                });
              }
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
              <div className='row'>
                <div className='twelve columns'>
                  <input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Enter your email'
                    className='u-full-width'
                  />
                  {errors.email && touched.email ? (
                    <div className='error_label'>{errors.email}</div>
                  ) : null}
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder='Enter your password'
                    className='u-full-width'
                  />
                  {errors.password && touched.password ? (
                    <div className='error_label'>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <button type='submit'>Login</button>
              <br />
              {this.state.validation ? (
                <div className='error_label'> Error, please try again</div>
              ) : null}
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
