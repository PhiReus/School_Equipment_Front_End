import React from "react";

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
                    <a href="index.html" className="menu-link">
                      <span className="menu-icon fas fa-home" />{" "}
                      <span className="menu-text">Dashboard</span>
                    </a>
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon far fa-file" />{" "}
                      <span className="menu-text">App Pages</span>{" "}
                      <span className="badge badge-warning">New</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="page-clients.html" className="menu-link">
                          Clients
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="page-teams.html" className="menu-link">
                          Teams
                        </a>
                      </li>
                      <li className="menu-item has-child">
                        <a href="#" className="menu-link">
                          Team
                        </a>{" "}
                        {/* grand child menu */}
                        <ul className="menu">
                          <li className="menu-item">
                            <a href="page-team.html" className="menu-link">
                              Overview
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="page-team-feeds.html"
                              className="menu-link"
                            >
                              Feeds
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="page-team-projects.html"
                              className="menu-link"
                            >
                              Projects
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="page-team-members.html"
                              className="menu-link"
                            >
                              Members
                            </a>
                          </li>
                        </ul>
                        {/* /grand child menu */}
                      </li>
                      <li className="menu-item has-child">
                        <a href="#" className="menu-link">
                          Project
                        </a>{" "}
                        {/* grand child menu */}
                        <ul className="menu">
                          <li className="menu-item">
                            <a href="page-project.html" className="menu-link">
                              Overview
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="page-project-board.html"
                              className="menu-link"
                            >
                              Board
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="page-project-gantt.html"
                              className="menu-link"
                            >
                              Gantt View
                            </a>
                          </li>
                        </ul>
                        {/* /grand child menu */}
                      </li>
                      <li className="menu-item">
                        <a href="page-calendar.html" className="menu-link">
                          Calendar
                        </a>
                      </li>
                      <li className="menu-item has-child">
                        <a href="#" className="menu-link">
                          Invoices
                        </a>{" "}
                        {/* grand child menu */}
                        <ul className="menu">
                          <li className="menu-item">
                            <a href="page-invoices.html" className="menu-link">
                              List
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="page-invoice.html" className="menu-link">
                              Details
                            </a>
                          </li>
                        </ul>
                        {/* /grand child menu */}
                      </li>
                      <li className="menu-item">
                        <a href="page-messages.html" className="menu-link">
                          Messages
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="page-conversations.html" className="menu-link">
                          Conversations
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-wrench" />{" "}
                      <span className="menu-text">Auth</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="auth-comingsoon-v1.html" className="menu-link">
                          Coming Soon v1
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-comingsoon-v2.html" className="menu-link">
                          Coming Soon v2
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="auth-cookie-consent.html"
                          className="menu-link"
                        >
                          Cookie Consent
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-empty-state.html" className="menu-link">
                          Empty State
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-error-v1.html" className="menu-link">
                          Error Page v1
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-error-v2.html" className="menu-link">
                          Error Page v2
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-error-v3.html" className="menu-link">
                          Error Page v3
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-maintenance.html" className="menu-link">
                          Maintenance
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-page-message.html" className="menu-link">
                          Page Message
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="auth-session-timeout.html"
                          className="menu-link"
                        >
                          Session Timeout
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-signin-v1.html" className="menu-link">
                          Sign In v1
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-signin-v2.html" className="menu-link">
                          Sign In v2
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-signup.html" className="menu-link">
                          Sign Up
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="auth-recovery-username.html"
                          className="menu-link"
                        >
                          Recovery Username
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="auth-recovery-password.html"
                          className="menu-link"
                        >
                          Recovery Password
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="auth-lockscreen.html" className="menu-link">
                          Screen Locked
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-person" />{" "}
                      <span className="menu-text">User</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="user-profile.html" className="menu-link">
                          Profile
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="user-activities.html" className="menu-link">
                          Activities
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="user-teams.html" className="menu-link">
                          Teams
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="user-projects.html" className="menu-link">
                          Projects
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="user-tasks.html" className="menu-link">
                          Tasks
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="user-profile-settings.html"
                          className="menu-link"
                        >
                          Profile Settings
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="user-account-settings.html"
                          className="menu-link"
                        >
                          Account Settings
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="user-billing-settings.html"
                          className="menu-link"
                        >
                          Billing Settings
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="user-notification-settings.html"
                          className="menu-link"
                        >
                          Notification Settings
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-active has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-browser" />{" "}
                      <span className="menu-text">Layouts</span>{" "}
                      <span className="badge badge-subtle badge-success">
                        +4
                      </span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item has-active">
                        <a href="layout-blank.html" className="menu-link">
                          Blank Page
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-nosearch.html" className="menu-link">
                          Header no Search
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="layout-horizontal-menu.html"
                          className="menu-link"
                        >
                          Horizontal Menu
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-fullwidth.html" className="menu-link">
                          Full Width
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-pagenavs.html" className="menu-link">
                          Page Navs
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-pagecover.html" className="menu-link">
                          Page Cover
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="layout-pagecover-img.html"
                          className="menu-link"
                        >
                          Cover Image
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-pagesidebar.html" className="menu-link">
                          Page Sidebar
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="layout-pagesidebar-fluid.html"
                          className="menu-link"
                        >
                          Sidebar Fluid
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="layout-pagesidebar-hidden.html"
                          className="menu-link"
                        >
                          Sidebar Hidden
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="layout-custom.html" className="menu-link">
                          Custom
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item">
                    <a href="landing-page.html" className="menu-link">
                      <span className="menu-icon fas fa-rocket" />{" "}
                      <span className="menu-text">Landing Page</span>
                    </a>
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-header */}
                  <li className="menu-header">Interfaces </li>
                  {/* /.menu-header */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-puzzle-piece" />{" "}
                      <span className="menu-text">Components</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="component-general.html" className="menu-link">
                          General
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="component-icons.html" className="menu-link">
                          Icons
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="component-rich-media.html"
                          className="menu-link"
                        >
                          Rich Media
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="component-list-views.html"
                          className="menu-link"
                        >
                          List Views
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="component-sortable-nestable.html"
                          className="menu-link"
                        >
                          Sortable &amp; Nestable
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="component-activity.html" className="menu-link">
                          Activity
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="component-steps.html" className="menu-link">
                          Steps
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="component-tasks.html" className="menu-link">
                          Tasks
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="component-metrics.html" className="menu-link">
                          Metrics
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-pencil" />{" "}
                      <span className="menu-text">Forms</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="form-basic.html" className="menu-link">
                          Basic Elements
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="form-autocompletes.html" className="menu-link">
                          Autocompletes
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="form-pickers.html" className="menu-link">
                          Pickers
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="form-editors.html" className="menu-link">
                          Editors
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon fas fa-table" />{" "}
                      <span className="menu-text">Tables</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="table-basic.html" className="menu-link">
                          Basic Table
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="table-datatables.html" className="menu-link">
                          Datatables
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="table-responsive-datatables.html"
                          className="menu-link"
                        >
                          Responsive Datatables
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="table-filters-datatables.html"
                          className="menu-link"
                        >
                          Filter Columns
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-bar-chart" />{" "}
                      <span className="menu-text">Collections</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item has-child">
                        <a href="#" className="menu-link">
                          Chart.js
                        </a>{" "}
                        {/* grand child menu */}
                        <ul className="menu">
                          <li className="menu-item">
                            <a
                              href="collection-chartjs-line.html"
                              className="menu-link"
                            >
                              Line
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="collection-chartjs-bar.html"
                              className="menu-link"
                            >
                              Bar
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="collection-chartjs-radar-scatter.html"
                              className="menu-link"
                            >
                              Radar &amp; Scatter
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="collection-chartjs-others.html"
                              className="menu-link"
                            >
                              Others
                            </a>
                          </li>
                        </ul>
                        {/* /grand child menu */}
                      </li>
                      <li className="menu-item">
                        <a
                          href="collection-flot-charts.html"
                          className="menu-link"
                        >
                          Flot
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="collection-inline-charts.html"
                          className="menu-link"
                        >
                          Inline Charts
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="collection-jqvmap.html" className="menu-link">
                          Vector Map
                        </a>
                      </li>
                    </ul>
                    {/* /child menu */}
                  </li>
                  {/* /.menu-item */}
                  {/* .menu-item */}
                  <li className="menu-item has-child">
                    <a href="#" className="menu-link">
                      <span className="menu-icon oi oi-list-rich" />{" "}
                      <span className="menu-text">Level Menu</span>
                    </a>{" "}
                    {/* child menu */}
                    <ul className="menu">
                      <li className="menu-item">
                        <a href="#" className="menu-link">
                          Menu Item
                        </a>
                      </li>
                      <li className="menu-item has-child">
                        <a href="#" className="menu-link">
                          Menu Item
                        </a>{" "}
                        {/* grand child menu */}
                        <ul className="menu">
                          <li className="menu-item">
                            <a href="#" className="menu-link">
                              Child Item
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="#" className="menu-link">
                              Child Item
                            </a>
                          </li>
                          <li className="menu-item has-child">
                            <a href="#" className="menu-link">
                              Child Item
                            </a>{" "}
                            {/* grand child menu */}
                            <ul className="menu">
                              <li className="menu-item">
                                <a href="#" className="menu-link">
                                  Grand Child Item
                                </a>
                              </li>
                              <li className="menu-item">
                                <a href="#" className="menu-link">
                                  Grand Child Item
                                </a>
                              </li>
                              <li className="menu-item">
                                <a href="#" className="menu-link">
                                  Grand Child Item
                                </a>
                              </li>
                              <li className="menu-item">
                                <a href="#" className="menu-link">
                                  Grand Child Item
                                </a>
                              </li>
                            </ul>
                            {/* /grand child menu */}
                          </li>
                          <li className="menu-item">
                            <a href="#" className="menu-link">
                              Child Item
                            </a>
                          </li>
                        </ul>
                        {/* /grand child menu */}
                      </li>
                      <li className="menu-item">
                        <a href="#" className="menu-link">
                          Menu Item
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
