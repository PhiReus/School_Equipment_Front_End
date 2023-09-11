import React from "react";
import { IconName, IoBookSharp, IoCalendarClearOutline, IoGridSharp, IoHammerSharp, IoHome, IoHomeOutline, IoLayersOutline, IoPeopleCircleOutline, IoPeopleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function Sidebar(props) {
  return (
    <>
       <div className="aside-menu overflow-hidden">
        {/* .stacked-menu */}
        <nav id="stacked-menu" className="stacked-menu">
          {/* .menu */}
          <ul className="menu">
            {/* .menu-item */}
            <li className="menu-item">
              <Link to={'/'} className="menu-link">
                <IoHome />
                <span className="menu-text">Trang chủ</span>
              </Link>
            </li>
            {/* /.menu-item */}
            {/* .menu-item */}
            {/* .menu-header */}
            <li className="menu-header">Danh Mục </li>
            {/* /.menu-header */}
            {/* .menu-item */}
            {/* .menu-item */}
            <li className="menu-item has-child">
              <a href="#" className="menu-link">
                <IoPeopleSharp/>{"    "}
                  
                <span className="menu-text">Giáo Viên</span>
              </a>{" "}
              {/* child menu */}
              <ul className="menu">
                <li className="menu-item">
                  <Link to={'/'} className="menu-link">
                    Danh Sách
                  </Link>
                </li>
              </ul>
              {/* /child menu */}
            </li>
            {/* /.menu-item */}
            {/* .menu-item */}
            <li className="menu-item has-child">
              <a href="#" className="menu-link">
                <IoHammerSharp />{"    "}
                <span className="menu-text">Thiết Bị</span>{" "}
              </a>
              {/* child menu */}
              <ul className="menu">
                <li className="menu-item">
                  <Link to={'/Devices'} className="menu-link">
                    Danh Sách
                  </Link>
                </li>
              </ul>
              {/* /child menu */}
            </li>
            {/* /.menu-item */}
            {/* .menu-item */}
            {/* /.menu-item */}
            <li className="menu-item has-child">
              <a href="#" className="menu-link">
                {" "}
                
                  <IoBookSharp />{"    "}
                
                <span className="menu-text">Phiếu Mượn</span>
              </a>{" "}
              {/* child menu */}
              <ul className="menu">
                <li className="menu-item">
                  <Link to={'/Borrows'} className="menu-link">
                    Danh Sách Phiếu
                  </Link>
                </li>
              </ul>
              {/* /child menu */}
            </li>
            <li className="menu-item has-child">
              <a href="#" className="menu-link">
                <IoGridSharp />{"    "}
                <span className="menu-text">Cart</span>
              </a>{" "}
              {/* child menu */}
              <ul className="menu">
                <li className="menu-item">
                  <a href="#" className="menu-link">
                    Danh Sách Quyền
                  </a>
                </li>
              </ul>
              {/* /child menu */}
            </li>
            {/* /.menu-item */}
          </ul>
          {/* /.menu */}
        </nav>
        {/* /.stacked-menu */}
      </div>      
    </>
  );
}

export default Sidebar;
