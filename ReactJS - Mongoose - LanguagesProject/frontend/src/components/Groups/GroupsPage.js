import React, { Component } from 'react';
import GroupCard from './GroupCard';
import { connect } from 'react-redux';
import { getAllGroups } from '../../actions/groupsActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GroupFilter from './GroupFilter';

class GroupsPage extends Component{

    state = {
        groups: [{}],
        filteredGroups: [{}]
    }

    componentDidMount() {
        this.props.getAllGroups().then(res => {
            this.setState({groups: res, filteredGroups: res});
        });
    }

    filterChange = (groupName) => {
        if (groupName !== "" || groupName != " ") {
            let filteredGroups = this.state.groups.filter(group => {
                return group.name.toLowerCase().indexOf(groupName.toLowerCase()) !== -1;
            });
            this.setState({filteredGroups});
        } else {
            filteredGroups = this.state.groups;
        }
        
      }

    render() {
        const topOptions = (
            <div>
                <Link to="/groups/new"><button className="btn btn-primary">Criar grupo</button></Link>
            </div>
        );
        let { filteredGroups } = this.state;
        return(
            <div className="container">
                <GroupFilter filterChange={this.filterChange}/>
                <div style={{marginTop: '10px'}}>
                    {this.props.isAuthenticated && topOptions}
                </div>
                <div>
                    {filteredGroups.map((group, index) => <GroupCard key={`${group.groupId}_${index}`} {...group} />)}
                </div>
            </div>
            
        )
    }
}

GroupsPage.propTypes = {
    getAllGroups: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { getAllGroups })(GroupsPage);