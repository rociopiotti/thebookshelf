import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Users/login";
import Logout from "./components/Users/logout";

// ADMIN
import Admin from "./components/Users/Admin/admin";
import AddPosts from "./components/Users/Admin/Posts/add";
import EditPost from "./components/Users/Admin/Posts/edit";
import AdminPosts from "./components/Users/Admin/Posts/posts"

// HOC
import MainLayout from "./HOC/mainLayout";
import Auth from "./HOC/auth";

const Routes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route
            path='/admin/posts/edit/:id'
            component={Auth(EditPost, true)}></Route>
          <Route
            path='/admin/posts/create'
            component={Auth(AddPosts, true)}></Route>
              <Route
            path='/admin/posts'
            component={Auth(AdminPosts, true)}></Route>
          <Route path='/admin' component={Auth(Admin, true)}></Route>
          <Route path='/logout' component={Auth(Logout, true)}></Route>
          <Route path='/login' component={Auth(Login, false)}></Route>
          <Route path="/" component={Auth(Home)}/>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
export default Routes;
