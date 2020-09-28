import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Users/login";
import Logout from "./components/Users/logout";

// ADMIN
import Admin from "./components/Users/Admin/admin";
import AddPosts from "./components/Users/Admin/Posts/add";
import EditPost from "./components/Users/Admin/Posts/edit";
import AdminPosts from "./components/Users/Admin/Posts/posts";
import Article from "./components/Article/article";
import Account from "./components/Users/Admin/account"
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
            component={Auth(EditPost, true)}
          />
          <Route path='/admin/posts/create' component={Auth(AddPosts, true)} />
          <Route path='/admin/posts' component={Auth(AdminPosts, true)} />
          <Route path='/article/:id' component={Auth(Article)} />
          <Route path='/admin/account/settings/' component={Auth(Account, true)} />
          <Route path='/admin' component={Auth(Admin, true)} />
          <Route path='/logout' component={Auth(Logout, true)} />
          <Route path='/login' component={Auth(Login, false)} />
          <Route path='/' component={Auth(Home)} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
export default Routes;
