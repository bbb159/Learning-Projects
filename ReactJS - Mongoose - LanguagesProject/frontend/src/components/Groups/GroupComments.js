import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupCommentsItem from './GroupCommentsItem';
import PropTypes from 'prop-types';
import { addComment, removeComment } from '../../actions/groupsActions';

class GroupComments extends Component {

    state = {
        commentBody: "",
        errors: {}
    }

    onChange = (e) => {
        this.setState(...this.state, { [e.target.name]: e.target.value })
    }

    addComment = (e) => {
        e.preventDefault();
        const { userId, firstName } = this.props.user;
        const body = {
            authorId: userId,
            authorName: firstName,
            commentBody: this.state.commentBody
        }
        this.props.addComment(this.props.groupId,body)
            .then(() => location.reload())
            .catch(err => 
                {
                    console.log(err);
                    this.setState({ errors: err.response.data.errors})
                });
    }

    removeComment = (comment) => {
        this.props.removeComment(this.props.groupId, comment)
            .then(location.reload())
            .catch(err => this.setState({ errors: err.response.data.errors}));
    }

    render() {
        const { errors, commentBody } = this.state;
        const addComment = (
            <div>

                { errors.global && <div className="alert-danger">{errors.global}</div> }
                    <h4>Adicionar comentário</h4>
                    <form onSubmit={this.addComment}>
                        <div className="form-group">
                            <label className="control-label">Qual a sua opinião sobre esse grupo?</label>
                            <textarea className="form-control" name="commentBody" rows="3" value={commentBody} onChange={this.onChange}></textarea>
                        </div>
                        <div className="form-group"><button className="btn btn-primary">Enviar</button></div>
                    </form>
            </div>
        );
        return(
            <div>
                <h3>Comentários do grupo:</h3>
                <div className="card pre-scrollable">
                    <div className="card-body">
                        {this.props.comments.map((comment, index) => <GroupCommentsItem key={`${comment._id}_${index}`} 
                                                                        comment={comment} 
                                                                        userId={this.props.userId}
                                                                        removeComment={this.removeComment} />)}
                    </div>
                </div>
                {this.props.belongsToGroup == "true" && addComment}
            </div>
        );
    }
}

GroupComments.propTypes = {
    user: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    belongsToGroup: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { addComment, removeComment })(GroupComments);