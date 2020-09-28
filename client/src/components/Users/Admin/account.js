import React, { Component } from "react";

// HOC
import AdminLayout from "../../../HOC/adminLayout";

//----------------------------------------------------
// TODO: Formulario para cambiar el mail y los datos del usuario
// En server crear endpoint para modifyUser y updateUser en database
//----------------------------------------------------
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
