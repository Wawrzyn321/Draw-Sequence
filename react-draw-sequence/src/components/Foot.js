import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AuthService from "./../services/auth";
import { connect } from "react-redux";

class Foot extends React.Component {
  logout() {
    AuthService.logOut(this.props.dispatch);
    this.props.history.push("/list");
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <footer className="footer mt-auto py-3">
        <div className="container">
          {isLoggedIn && (
            <span className="d-block text-center">
              <Link to="/admin-list" className="mr-2">
                Admin Panel
              </Link>
              {/* eslint-disable-next-line */}
              <a href="#" onClick={() => this.logout()}>
                Log out
              </a>
            </span>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="d-block text-center">
              Admin Login
            </Link>
          )}
        </div>
      </footer>
    );
  }
}

function mapStateToProps() {
  return state => {
    return {
      isLoggedIn: state.auth.isLoggedIn
    };
  };
}

export default connect(mapStateToProps())(withRouter(Foot));
