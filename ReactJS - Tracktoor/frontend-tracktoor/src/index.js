import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setCurrentUser } from './actions/authActions';
import configureStore from './store/configureStore';
import setAuthorizationToken from './utils/setAuthorizationToken';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import '../node_modules/bootstrap/dist/js/bootstrap';

const jsx = (
    <BrowserRouter>
        <Provider store={configureStore}>
            <Route component={AppRouter} />
        </Provider>
    </BrowserRouter>
);

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    configureStore.dispatch(setCurrentUser(localStorage.getItem('UserDetail')));
}


ReactDOM.render(jsx, document.getElementById('root'));

serviceWorker.unregister();
