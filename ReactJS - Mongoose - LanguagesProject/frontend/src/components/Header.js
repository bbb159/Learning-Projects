import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

class Header extends Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const { name } = this.props.user;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="mainNav">
        <div className="container">
          <Link className="navbar-brand" to="/">IDIOMAS</Link>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}  
              {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/mygroups">Meus grupos</Link></li>}
              <li className="nav-item"><Link className="nav-link" to="/groups">Grupos</Link></li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {isAuthenticated && <li className="nav-item"><a id="welcome" className="nav-link disabled">Bem-vindo, {name}!</a></li>}
              {isAuthenticated && <li className="nav-item"><a className="nav-link" href="#" onClick={this.logout.bind(this)}>Logout</a></li>}
              {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/signup">Registrar</Link></li>}
              {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
  
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { logout })(Header);
