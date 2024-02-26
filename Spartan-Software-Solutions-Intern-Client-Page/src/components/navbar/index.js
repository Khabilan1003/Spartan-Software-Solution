import React, { useState } from "react";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const NavBar = ({mobile , setMobile}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };

  // For Menu Option in Mobile View

  return (
    <>
      <div className={style.navigation}>
        <h3 className={style.title}>Administrator Page</h3>
        <div>
          {user.isLoggedIn === false ? (
            <div className={style.linkContainer}>
              <ul
                className={
                  mobile == false
                    ? style.unordered_list_desktop
                    : style.unordered_list_mobile
                }
              >
                <li className={`${style.page}`}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/viewData"
                  >
                    View
                  </NavLink>
                </li>
                <li className={`${style.page}`}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/loadData"
                  >
                    Load
                  </NavLink>
                </li>
                <li className={style.page}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className={`${style.page}`}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
              {mobile == true ? (
                <button
                  className={style.mobileCloseButton}
                  onClick={() => setMobile(false)}
                >
                  <AiOutlineClose className={style.mobileCloseIcon} />
                </button>
              ) : (
                <button
                  className={style.mobileBarButton}
                  onClick={() => setMobile(true)}
                >
                  <FaBars className={style.mobileBarIcon} />
                </button>
              )}
            </div>
          ) : (
            <div className={style.linkContainer}>
              <ul
                className={
                  mobile == false
                    ? style.unordered_list_desktop
                    : style.unordered_list_mobile
                }
              >
                <li className={`${style.page}`}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/viewData"
                  >
                    View
                  </NavLink>
                </li>
                <li className={`${style.page}`}>
                  <NavLink
                    className={mobile ? style.navlinkMobile : style.navlink}
                    to="/loadData"
                  >
                    Load
                  </NavLink>
                </li>
                <li className={style.page} onClick={() => logout()}>
                  <a className={mobile ? style.navlinkMobile : style.navlink}>
                    Logout
                  </a>
                </li>
              </ul>
              {mobile == true ? (
                <button
                  className={style.mobileCloseButton}
                  onClick={() => setMobile(false)}
                >
                  <AiOutlineClose className={style.mobileCloseIcon} />
                </button>
              ) : (
                <button
                  className={style.mobileBarButton}
                  onClick={() => setMobile(true)}
                >
                  <FaBars className={style.mobileBarIcon} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
