import React, { Children } from "react";
import Header from "../includes/Header1";
import Sidebar from "../includes/Sidebar";

function LayoutMaster({ children }) {
  return (
    <>
      <div className="app">
        <Header />
        <main className="app-main">
          <div className="wrapper">
            <div className="page">
              <div class="page-inner">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default LayoutMaster;