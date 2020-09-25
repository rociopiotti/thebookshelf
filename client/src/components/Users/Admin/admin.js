import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RouteLinks } from "../../../utils/routeLinks";

import { Link } from "react-router-dom";

import Fontawesome from "react-fontawesome";
const Admin = (props) => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData.userData);
  }, [dispatch, props]);

  const element = (item, i) => (
    <div key={i} className='dashboardItem'>
      <Link to={item.link} onClick={props.onHideNav}>
        <Fontawesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const showAdminLinks = () =>
    RouteLinks.admin.map((item, i) => {
      if (!item.dashboard) {
        return null;
      } else {
        return element(item, i);
      }
    });

  const showIntro = () => {
    if (userData) {
      const { name, lastname, email } = userData.userData;
      return (
        <div className='row'>
          <div className='twelve columns'>
            <h4>
              <span>Great to see you again </span>
              {name}!
            </h4>
            <br></br>
            <h5>
              <span>Dashboard</span>
            </h5>

            {showAdminLinks()}
          </div>
        </div>
      );
    }
  };
  return (
    <div className='container admin_layout'>
      {showIntro()}
      <div>
        {userData === false ? (
          <div className='row articles_container'>SORRY, NO USER FOUND</div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
