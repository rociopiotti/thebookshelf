import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/user_actions";

const Logout = (props) => {
  const logout = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (logout.auth === null) {
      setTimeout(() => {
        props.history.push("/");
      }, 2000);
    } else {
    }
  }, [logout, props]);

  return (
    <div className='logout_container'>
      <h1>Good bye!</h1>
    </div>
  );
};

export default Logout;
