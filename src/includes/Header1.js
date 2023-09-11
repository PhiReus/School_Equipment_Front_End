import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IconName, IoEnterOutline, IoPerson } from "react-icons/io5";
function Header(props) {
  const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const { id } = useParams();
  const LogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    setAcc(null);
  };
  const url = 'http://127.0.0.1:8000';
  return (
    <>
        <header className="app-header app-header-dark">
          {/* .top-bar */}
          <div className="top-bar">
            {/* .top-bar-brand */}
            <div className="top-bar-brand">
              {/* toggle aside menu */}
              <button
                className="hamburger hamburger-squeeze mr-2"
                type="button"
                data-toggle="aside-menu"
                aria-label="toggle aside menu"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>{" "}
              {/* /toggle aside menu */}
              <a href="index.html">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  height={28}
                  viewBox="0 0 351 100"
                >
                  <defs>
                    <path
                      id="a"
                      d="M156.538 45.644v1.04a6.347 6.347 0 0 1-1.847 3.98L127.708 77.67a6.338 6.338 0 0 1-3.862 1.839h-1.272a6.34 6.34 0 0 1-3.862-1.839L91.728 50.664a6.353 6.353 0 0 1 0-9l9.11-9.117-2.136-2.138a3.171 3.171 0 0 0-4.498 0L80.711 43.913a3.177 3.177 0 0 0-.043 4.453l-.002.003.048.047 24.733 24.754-4.497 4.5a6.339 6.339 0 0 1-3.863 1.84h-1.27a6.337 6.337 0 0 1-3.863-1.84L64.971 50.665a6.353 6.353 0 0 1 0-9l26.983-27.008a6.336 6.336 0 0 1 4.498-1.869c1.626 0 3.252.622 4.498 1.87l26.986 27.006a6.353 6.353 0 0 1 0 9l-9.11 9.117 2.136 2.138a3.171 3.171 0 0 0 4.498 0l13.49-13.504a3.177 3.177 0 0 0 .046-4.453l.002-.002-.047-.048-24.737-24.754 4.498-4.5a6.344 6.344 0 0 1 8.996 0l26.983 27.006a6.347 6.347 0 0 1 1.847 3.98zm-46.707-4.095l-2.362 2.364a3.178 3.178 0 0 0 0 4.501l2.362 2.364 2.361-2.364a3.178 3.178 0 0 0 0-4.501l-2.361-2.364z"
                    />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <path
                      fill="currentColor"
                      fillRule="nonzero"
                      d="M39.252 80.385c-13.817 0-21.06-8.915-21.06-22.955V13.862H.81V.936h33.762V58.1c0 6.797 4.346 9.026 9.026 9.026 2.563 0 5.237-.446 8.58-1.783l3.677 12.034c-5.794 1.894-9.694 3.009-16.603 3.009zM164.213 99.55V23.78h13.372l1.225 5.571h.335c4.457-4.011 10.585-6.908 16.491-6.908 13.817 0 22.174 11.031 22.174 28.08 0 18.943-11.588 29.863-23.957 29.863-4.903 0-9.694-2.117-13.594-6.017h-.446l.78 9.025V99.55h-16.38zm25.852-32.537c6.128 0 10.92-4.903 10.92-16.268 0-9.917-3.232-14.932-10.14-14.932-3.566 0-6.797 1.56-10.252 5.126v22.397c3.12 2.674 6.686 3.677 9.472 3.677zm69.643 13.372c-17.272 0-30.643-10.586-30.643-28.972 0-18.163 13.928-28.971 28.748-28.971 17.049 0 26.075 11.477 26.075 26.52 0 3.008-.558 6.017-.78 7.354h-37.663c1.56 8.023 7.465 11.589 16.491 11.589 5.014 0 9.36-1.337 14.263-3.9l5.46 9.917c-6.351 4.011-14.597 6.463-21.951 6.463zm-1.338-45.463c-6.462 0-11.031 3.454-12.702 10.363h23.622c-.78-6.797-4.568-10.363-10.92-10.363zm44.238 44.126V23.779h13.371l1.337 12.034h.334c5.46-9.025 13.595-13.371 22.398-13.371 4.902 0 7.465.78 10.697 2.228l-3.343 13.706c-3.454-1.003-5.683-1.56-9.806-1.56-6.797 0-13.928 3.566-18.608 13.483v28.749h-16.38z"
                    />
                    <use className="fill-warning" xlinkHref="#a" />
                  </g>
                </svg>
              </a>
            </div>
            {/* /.top-bar-brand */}
            {/* .top-bar-list */}
            <div className="top-bar-list">
              {/* .top-bar-item */}
              <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
                {/* toggle menu */}
                <button
                  className="hamburger hamburger-squeeze"
                  type="button"
                  data-toggle="aside"
                  aria-label="toggle menu"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>{" "}
                {/* /toggle menu */}
              </div>
              {/* /.top-bar-item */}
              {/* .top-bar-item */}
             
              {/* /.top-bar-item */}
              {/* .top-bar-item */}
              <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">
                {/* .nav */}
                <ul className="header-nav nav">
                 
                  <li className="nav-item dropdown header-nav-dropdown">
                    
                    {/* .dropdown-menu */}
                    <div className="dropdown-menu dropdown-menu-rich dropdown-menu-right">
                      <div className="dropdown-arrow" />
                      {/* .dropdown-sheets */}
                      <div className="dropdown-sheets">
                        {/* .dropdown-sheet-item */}
                        <div className="dropdown-sheet-item">
                        </div>
                        {/* /.dropdown-sheet-item */}
                        {/* .dropdown-sheet-item */}
                        <div className="dropdown-sheet-item">
                        </div>
                        {/* /.dropdown-sheet-item */}
                        {/* .dropdown-sheet-item */}
                        <div className="dropdown-sheet-item">
                          <a href="#" className="tile-wrapper">
                            <span className="tile tile-lg bg-pink">
                              <i className="fa fa-tasks" />
                            </span>{" "}
                            <span className="tile-peek">Tasks</span>
                          </a>
                        </div>
                        {/* /.dropdown-sheet-item */}
                        {/* .dropdown-sheet-item */}
                        <div className="dropdown-sheet-item">
                          <a href="#" className="tile-wrapper">
                            <span className="tile tile-lg bg-yellow">
                              <i className="oi oi-fire" />
                            </span>{" "}
                            <span className="tile-peek">Feeds</span>
                          </a>
                        </div>
                        {/* /.dropdown-sheet-item */}
                        {/* .dropdown-sheet-item */}
                        <div className="dropdown-sheet-item">
                          <a href="#" className="tile-wrapper">
                            <span className="tile tile-lg bg-cyan">
                              <i className="oi oi-document" />
                            </span>{" "}
                            <span className="tile-peek">Files</span>
                          </a>
                        </div>
                        {/* /.dropdown-sheet-item */}
                      </div>
                      {/* .dropdown-sheets */}
                    </div>
                    {/* .dropdown-menu */}
                  </li>
                  {/* /.nav-item */}
                </ul>
                {/* /.nav */}
                {/* .btn-account */}
                <div className="dropdown d-none d-md-flex">
                  <button
                    className="btn-account"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="user-avatar user-avatar-md">
                      <img src={url + acc.image} alt="" />
                    </span>{" "}
                    <span className="account-summary pr-lg-4 d-none d-lg-block">
                      <span className="account-name">{acc.name}</span>{" "}
                      <span className="account-description">
                        {acc.email}
                      </span>
                    </span>
                  </button>{" "}
                  {/* .dropdown-menu */}
                  <div className="dropdown-menu">
                    <div className="dropdown-arrow d-lg-none" x-arrow="" />
                    <div className="dropdown-arrow ml-3 d-none d-lg-block" />
                    <h6 className="dropdown-header d-none d-md-block d-lg-none">
                      {" "}
                      Beni Arisandi{" "}
                    </h6>
                    <Link className="dropdown-item" to={"/users/" + acc.id}>
                    <IoPerson/> Thông tin
                    </Link>{" "}
                    <Link to={'/login'} onClick={LogOut} className="dropdown-item" href="auth-signin-v1.html">
                      <IoEnterOutline />{" "}
                      Đăng xuất
                    </Link>
                    <div className="dropdown-divider" />
                  </div>
                  {/* /.dropdown-menu */}
                </div>
                {/* /.btn-account */}
              </div>
              {/* /.top-bar-item */}
            </div>
            {/* /.top-bar-list */}
          </div>
          {/* /.top-bar */}
        </header>
        <aside className="app-aside app-aside-expand-md app-aside-light">
          <div className="aside-content">
            <header className="aside-header d-block d-md-none">
              <button
                className="btn-account"
                type="button"
                data-toggle="collapse"
                data-target="#dropdown-aside"
              >
                <span className="user-avatar user-avatar-lg">
                  <img src="assets/images/avatars/profile.jpg" alt="" />
                </span>{" "}
                <span className="account-icon">
                  <span className="fa fa-caret-down fa-lg" />
                </span>{" "}
                <span className="account-summary">
                  <span className="account-name">Beni Arisandi</span>{" "}
                  <span className="account-description">Marketing Manager</span>
                </span>
              </button>{" "}
              <div id="dropdown-aside" className="dropdown-aside collapse">
                <div className="pb-3">
                  <a className="dropdown-item" href="user-profile.html">
                    <span className="dropdown-icon oi oi-person" /> Profile
                  </a>{" "}
                  <a className="dropdown-item" href="auth-signin-v1.html">
                    <span className="dropdown-icon oi oi-account-logout" />{" "}
                    Logout
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Help Center
                  </a>{" "}
                  <a className="dropdown-item" href="#">
                    Ask Forum
                  </a>{" "}
                  <a className="dropdown-item" href="#">
                    Keyboard Shortcuts
                  </a>
                </div>
              </div>
            </header>
           <Sidebar/>
            <footer className="aside-footer border-top p-2">
              <button
                className="btn btn-light btn-block text-primary"
                data-toggle="skin"
              >
                <span className="d-compact-menu-none">Night mode</span>{" "}
                <i className="fas fa-moon ml-1" />
              </button>
            </footer>
          </div>
        </aside>
    </>
  );
}

export default Header;
