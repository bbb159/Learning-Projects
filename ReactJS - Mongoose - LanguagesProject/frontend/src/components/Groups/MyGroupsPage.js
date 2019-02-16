import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserGroups } from '../../actions/usersActions';
import GroupCard from './GroupCard';

class MyGroupsPage extends Component {

    state = {
        groups: [{}]
    }

    componentDidMount() {
        this.props.getUserGroups(this.props.userId).then(res => {
            this.setState({groups: res.data.groups})
        });
    }

    render() {
        return (
            <div className="container">
                    {this.state.groups.map((group, index) => <GroupCard key={`${group._id}_${index}`} {...group} />)}
            </div>
        );
    }
}

MyGroupsPage.propTypes = {
    getUserGroups: PropTypes.func.isRequired
}

const mapStateToProps =  (state) => {
    return {
        userId: state.auth.user.userId
    };
}

export default connect(mapStateToProps, { getUserGroups })(MyGroupsPage);