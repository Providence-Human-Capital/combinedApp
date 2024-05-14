import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

const NavigationBar = () => {
  const [isSideBarCollapsed, setSidebarCollapsed] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSideBarCollapsed);
  };

  const signUserOut = () => {
    dispatch(authActions.setLogout());
    navigate("/login");
  };

  return (
    <>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          <Link to={"/"} className="logo">
            {isSideBarCollapsed && (
              <div className="logo-mini w-50">
                <span className="light-logo">
                  <img
                    src="/assets/images/P.png"
                    alt="logo"
                    style={{
                      height: "50px",
                    }}
                  />
                </span>
              </div>
            )}

            <div className="logo-lg">
              <span className="light-logo">
                <img
                  src="/assets/images/PROVIDENCE HEALTH LOGO.png"
                  alt="logo"
                  style={{
                    height: "7rem",
                  }}
                />
              </span>
            </div>
          </Link>
        </div>
        <nav className="navbar navbar-static-top">
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <a
                  onClick={handleToggleSidebar}
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                >
                  <i
                    className="ti-menu"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="btn-group d-lg-inline-flex d-none">
                <div className="app-menu">
                  <div className="search-bx mx-5">
                    <form>
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn"
                            type="submit"
                            id="button-addon3"
                          >
                            <i
                              className="ti-search"
                              style={{
                                fontSize: "20px",
                                marginTop: "10px",
                              }}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              <li className="btn-group nav-item d-lg-inline-flex d-none">
                <a
                  href="#"
                  data-provide="fullscreen"
                  className="waves-effect waves-light nav-link full-screen btn-warning-light"
                  title="Full Screen"
                >
                  <i
                    className="ti-fullscreen"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="dropdown notifications-menu">
                <a
                  href="#"
                  className="waves-effect waves-light dropdown-toggle btn-info-light"
                  data-bs-toggle="dropdown"
                  title="Notifications"
                >
                  <i
                    className="ti-bell"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </a>
                <ul className="dropdown-menu animated bounceIn">
                  <li className="header">
                    <div className="p-20">
                      <div className="flexbox">
                        <div>
                          <h4 className="mb-0 mt-0">Notifications</h4>
                        </div>
                        <div>
                          <a href="#" className="text-danger">
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <ul className="menu sm-scrol">
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-info"></i> Curabitur id
                          eros quis nunc suscipit blandit.
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="#">View all</a>
                  </li>
                </ul>
              </li>

              <li className="btn-group nav-item">
                <a
                  data-toggle="control-sidebar"
                  title="Setting"
                  className="waves-effect full-screen waves-light btn-danger-light"
                >
                  <i
                    className="ti-settings"
                    style={{
                      fontSize: "20px",
                    }}
                  ></i>
                </a>
              </li>

              <li className="dropdown user user-menu">
                <a
                  href="#"
                  className="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  data-bs-toggle="dropdown"
                  title="User"
                >
                  <div className="d-flex pt-5">
                    <div className="text-end me-10">
                      <p
                        className="pt-5 fs-14 mb-0 fw-700 text-primary"
                        style={{
                          color: "black",
                        }}
                      >
                        {user?.name}
                      </p>
                      <small className="fs-10 mb-0 text-uppercase text-mute">
                        {user?.role}
                      </small>
                    </div>
                    <img
                      src="/assets/images/user.jpg"
                      className="avatar rounded-10 bg-primary-light h-40 w-40"
                      alt=""
                    />
                  </div>
                </a>
                <ul className="dropdown-menu animated flipInX">
                  <li className="user-body">
                    <a className="dropdown-item" href="#">
                      <i className="ti-user text-muted me-2"></i> Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={() => signUserOut()}>
                      <i className="ti-lock text-muted me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavigationBar;
