import React from "react";
import { useSelector } from "react-redux";
import { RouteLinks } from "../../../utils/routeLinks";
import { Link } from "react-router-dom";
import Fontawesome from "react-fontawesome";
import AdminLayout from "../../../HOC/adminLayout";

const Admin = (props) => {
  const userData = useSelector((state) => state.user);

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
      const { name } = userData.userData;
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
    <AdminLayout>
      <div className='container admin_layout'>
        {showIntro()}
        <div>
          {userData === false ? (
            <div className='row articles_container'>SORRY, NO USER FOUND</div>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
