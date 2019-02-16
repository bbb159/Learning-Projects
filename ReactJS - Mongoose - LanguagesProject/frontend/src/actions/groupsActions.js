import axios from 'axios';
import { API  } from 'aws-amplify';

export const getAllGroups = () => {
    return dispatch => {
        return API.get('groups', '/groups');
    }
}

export const createGroup = (data) => {
    return dispatch => {
        return axios.post('http://localhost:5000/groups/new', data);
    }
}

export const getGroup = (groupId) => {
    return dispatch => {
        return API.get('groups', '/groups/' + groupId);
    }
}

export const joinGroup = (groupId, userId) => {
    const body = {
        groupId,
        userId
    };
    return dispatch => {
        return axios.post('http://localhost:5000/groups/join', body);
    }
}

export const exitGroup = (groupId, userId) => {
    const body = {
        groupId,
        userId
    };
    return dispatch => {
        return axios.post('http://localhost:5000/groups/exit', body);
    }
}

export const deleteGroup = (groupId) => {
    const data = {
        groupId
    };
    return dispatch => {
        return axios.delete('http://localhost:5000/groups/delete', {data});
    }
}

export const belongsToGroup = (userId, groupId) => {
    return dispatch => {
        return axios.get('http://localhost:5000/groups/' + userId + '/belongsTo/' + groupId)
    }
}

export const getUsersFromGroup = (groupId) => {
    return dispatch => {
        return axios.get('http://localhost:5000/groups/' + groupId + '/members');
    }
}

export const addComment = (groupId, comment) => {
    const body = {
        authorId: comment.authorId,
        authorName: comment.authorName,
        commentBody: comment.commentBody
    }
    console.log(body);
    return dispatch => {
        return axios.post('http://localhost:5000/groups/' + groupId + '/addComment', body);
    }
}

export const removeComment = (groupId, commentId) => {
    const data = {
        commentId
    }
    console.log(data);
    return dispatch => {
        return axios.delete('http://localhost:5000/groups/' + groupId + '/deleteComment', {data})
    }
}
