import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroup, joinGroup, exitGroup, deleteGroup, belongsToGroup, getUsersFromGroup } from '../../actions/groupsActions';
import { addFlashMessage } from '../../actions/flashMessagesActions';
import MemberCard from '../Members/MemberCard';
import GroupComments from './GroupComments';

class GroupDetail extends Component {
    state = {
        group: {
            comments: [{}]
        },
        members: [{}],
        belongsToGroup: "false",
        errors: {}
    }

    componentDidMount() {
        const { groupId } = this.props.match.params;
        const { userId } = this.props.user;
        this.props.getGroup(groupId)
            .then(res => {
                this.setState({group: res});
            });
        this.props.getUsersFromGroup(groupId)
            .then(res => {
                this.setState({members: res.data.members});
            });
        if (this.props.isAuthenticated) {
            this.props.belongsToGroup(userId, groupId).then(res => {
                this.setState({belongsToGroup: res.data});
            });
        }
    }

    join = () => {
        const { _id } = this.state.group;
        const { userId } = this.props.user;
        this.props.joinGroup(_id, userId).then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Você acabou de entrar no grupo!'
                });
                this.props.history.push("/dashboard");
            }
        ).catch(err => this.setState({ errors: err.response.data.errors}));
    }

    exit = () => {
        const { _id } = this.state.group;
        const { userId } = this.props.user;
        this.props.exitGroup(_id, userId).then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Você acabou de sair do grupo!'
                });
                this.props.history.push("/dashboard");
            }
        ).catch(err => this.setState({ errors: err.response.data.errors}));
    }

    delete = () => {
        const { _id } = this.state.group;
        this.props.deleteGroup(_id).then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Grupo apagado!'
                });
                this.props.history.push("/dashboard");
            }
        ).catch(err => this.setState({ errors: err.response.data.errors}));
    }

    render() {
        const { name, language, description, location, level, maxUsersAmount, owner, comments } = this.state.group;
        let joinOrExitButton;
        if(this.state.belongsToGroup == "true") {
            joinOrExitButton = <button className="btn btn-warning" onClick={this.exit}>Sair do grupo</button>
        } else {
            joinOrExitButton = <button className="btn btn-primary" onClick={this.join}>Entrar nesse grupo</button>
        }
        const deleteGroup = (
            <button className="btn btn-danger" style={{marginRight: "5px"}} onClick={this.delete}>Apagar</button>
        );

        return (
            <div className="container">

                <ul className="nav nav-pills nav-fill" style={{marginTop: "5px"}}>
                    <li className="nav-item">
                        <span className="nav-link active" style={{cursor: "pointer"}} data-target="#groupResume" data-toggle="tab">Resumo do grupo</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: "pointer"}} data-target="#basicInfo" data-toggle="tab">Informações básicas</span>
                    </li>
                </ul>
                
                <div className="tab-content">

                    <div className="tab-pane active" id="groupResume" style={{marginTop: "10px"}}>
                        <div style={{marginTop: '15px'}}>
                            <h3>Members</h3>
                        </div>
                        {/*<div className="row">
                            {this.state.members.map((member, index) => <MemberCard key={`${member._id}_${index}`} {...member} />)}
                        </div>
                        <div className="row">
                            <GroupComments 
                                comments={comments} 
                                userId={this.props.user.userId} 
                                groupId={this.props.match.params.groupId}
                                belongsToGroup={this.state.belongsToGroup}
                            />
                        </div>*/}
                    </div>
                    <div className="tab-pane" id="basicInfo" style={{marginTop: "10px"}}>
                        <div className="card">
                            <div className="card-body">
                            Nome do grupo: <p><b>{name}</b></p>
                            Idioma: <p><b>{language}</b></p>
                            Descrição: <p><b>{description}</b></p>
                            Localização: <p><b>{location}</b></p>
                            Nível: <p><b>{level}</b></p>
                            Quantidade máxima de participantes: <p><b>{maxUsersAmount}</b></p>

                            <div style={{marginTop: '10px'}}>
                                {this.props.isAuthenticated && this.props.user.userId == owner && deleteGroup}
                                {this.props.isAuthenticated && joinOrExitButton}
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        ); 
    }
}

GroupDetail.propTypes = {
    getGroup: PropTypes.func.isRequired,
    joinGroup: PropTypes.func.isRequired,
    exitGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    belongsToGroup: PropTypes.func.isRequired,
    getUsersFromGroup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getGroup, joinGroup, exitGroup,
    deleteGroup, belongsToGroup, addFlashMessage, getUsersFromGroup })(GroupDetail);