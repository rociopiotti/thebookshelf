import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Users/login";
import Admin from "./components/Users/Admin/admin";
import Logout from "./components/Users/logout";
// HOC
import MainLayout from "./HOC/mainLayout";
import Auth from "./HOC/auth";

const Routes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path='/admin' component={Auth(Admin,true)}></Route>
          <Route path='/logout' component={Auth(Logout,true)}></Route>
          <Route path='/login' component={Auth(Login, false)}></Route>
          <Route path='/' component={Auth(Home)}></Route>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
export default Routes;
