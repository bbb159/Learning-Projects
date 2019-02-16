import { combineReducers } from 'redux';
import userReducer from './userReducer';
import flashMessages from './flashMessagesReducer';
import auth from './authReducer';
//import groupReducer from './groupReducer';

export default combineReducers({
    flashMessages,
    auth
    //group: groupReducer
    //isso aqui é pra juntar todos os reducers
});