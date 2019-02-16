import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';

class Header extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navMarvel">
                <a className="navbar-brand ml-2" href="#">Marvel API</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isAuthenticated && <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/personagens">Personagens</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/autores">Autores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/series">Séries</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <a className="nav-link logout" onClick={this.logout.bind(this)}>
                                                Logout <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
                        </a>                       
                    </ul>
                </div>}
            </nav>
        );
    }

}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Header);