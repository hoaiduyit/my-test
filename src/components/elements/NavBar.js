import React from "react";
import { connectAutoDispatch } from "../hoc/connectAutoDispatch"
import CustomLink from "./CustomLink"

@connectAutoDispatch(state => {
  return {
    isLogin: state.userInfo && state.userInfo.isLogin,
    user: state.userInfo && state.userInfo.user
  }
}, {})
class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <CustomLink children="conduit" url="/" className="navbar-brand" />
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <CustomLink className="nav-link active" url="/" children="Home" />
            </li>
            {this.props.isLogin && (
              <span className="nav-item">
                <li className="nav-item">
                  <CustomLink url="/add-article" className="nav-link" children={<span><i className="ion-compose" />&nbsp;New Post</span>} />
                </li>
                <li className="nav-item">
                  <CustomLink url="/user-profile" className="nav-link" children={<span><i className="ion-gear-a"></i>&nbsp;Settings</span>} />
                </li>
              </span>

            )}
            {!this.props.isLogin ? (
              <span className="nav-item">
                <li className="nav-item">
                  <CustomLink url="/login" className="nav-link" children="Sign in" />
                </li>
                <li className="nav-item">
                  <CustomLink url="/register" className="nav-link" children="Sign up" />
                </li>
              </span>
            ) : (
                <li className="nav-item">
                  <span className="nav-link">{this.props.user.email}</span>
                </li>
              )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;