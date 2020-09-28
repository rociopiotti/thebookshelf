import React, { Component } from "react";

// HOC
import AdminLayout from "../../../HOC/adminLayout";
class Account extends Component {
  state = {
    success: false,
    validation: false,
  };
  render() {
    return (
      <AdminLayout>
        <h1>Account settings</h1>
        <hr />
        <p>Work in progress ...</p>
      </AdminLayout>
    );
  }
}

export default Account;
