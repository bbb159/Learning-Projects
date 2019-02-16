import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GroupCommentsItem extends Component {

	removeComment = (e) => {
		e.preventDefault();
		this.props.removeComment(this.props.comment._id)
	}

	render() {
		return (
			<div className="row">
					<div className="col-md-2">
						<img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
						<p className="text-secondary text-center">15 Minutes Ago</p>
					</div>
					<div className="col-md-10">
						<p>
							<a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{this.props.comment.authorName}</strong></a>
							<span className="float-right"><i className="text-warning fa fa-star"></i></span>
							<span className="float-right"><i className="text-warning fa fa-star"></i></span>
							<span className="float-right"><i className="text-warning fa fa-star"></i></span>
							<span className="float-right"><i className="text-warning fa fa-star"></i></span>
							{this.props.userId == this.props.comment.authorId && <span className="float-right"><button className="btn btn-danger btn-sm" onClick={this.removeComment}>Remover</button></span>}
	
					   </p>
					   <div className="clearfix"></div>
						<p>{this.props.comment.commentBody}</p>
					</div>
				</div>
		);
	}
}

GroupCommentsItem.propTypes = {
	removeComment: PropTypes.func.isRequired
}

export default GroupCommentsItem;