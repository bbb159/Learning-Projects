import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessagesActions';

export default (ComposedComponent) => {
    class Authenticate extends Component {

        componentWillMount() {
            if (!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'Faça login para acessar essa página'
                });
                this.props.history.push("/login");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated){
                this.props.history.push("/");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    }

    const mapStateToProps = (state) =>{
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    
    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
