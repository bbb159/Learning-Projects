import React, { Component } from 'react';
import TopHeader from './TopHeader';
import MiddleInfo from './MiddleInfo';
import MiddleInfoIcons from './MiddleInfoIcons';
import Footer from './Footer';
import { connect } from 'react-redux';
import { getAllGroups } from '../../actions/groupsActions';
import PropTypes from 'prop-types';

class HomePage extends Component {

    state = {
        groups: [{}]
    }

    componentDidMount() {
        this.props.getAllGroups().then(res => {
            this.setState({groups: res.data});
        });
    }

    render() {
        return(
            <div>
                <TopHeader />  
                <MiddleInfoIcons />
                <div className="container">
                <div className="row">
                    {this.state.groups.map((group, index) => <MiddleInfo key={`${group._id}_${index}`} {...group} />)}
                </div>
                </div>
                <Footer />
            </div>
        );
    }

}

HomePage.propTypes = {
    getAllGroups: PropTypes.func.isRequired
}


export default connect(null, { getAllGroups })(HomePage);