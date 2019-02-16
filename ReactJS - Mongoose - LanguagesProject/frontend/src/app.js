import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { Provider } from 'react-redux';
import { setCurrentUser } from './actions/authActions';
import { BrowserRouter, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import Amplify from "aws-amplify";
import { Auth } from 'aws-amplify'
import awsConfig from './config/aws-amplify';

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: awsConfig.cognito.REGION,
      userPoolId: awsConfig.cognito.USER_POOL_ID,
      identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "groups",
          endpoint: awsConfig.apiGateway.URL,
          region: awsConfig.apiGateway.REGION
        },
      ]
    }
  });

const jsx = (
    <BrowserRouter>
        <Provider store={configureStore}>
            <Route component={AppRouter}/>
        </Provider>
    </BrowserRouter>
);


Auth.currentAuthenticatedUser()
  .then(user => {
    const token = user.signInUserSession.idToken.jwtToken;
    const decodedToken = jwt.decode(token);
    const infoToSave = {
        username: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        address: decodedToken.address.formatted
    }
    configureStore.dispatch(setCurrentUser(infoToSave));
  }).catch(err => {
    setCurrentUser({});
  })



ReactDOM.render(jsx, document.getElementById('root'));