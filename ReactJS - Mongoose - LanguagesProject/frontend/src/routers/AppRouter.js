import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink, browserHistory } from 'react-router-dom';
import GroupsPage from '../components/Groups/GroupsPage';
import MembersPage from '../components/MembersPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import HomePage from '../components/Home/HomePage';
import SignUpPage from '../components/SignUp/SignUpPage';
import LoginPage from '../components/Login/LoginPage';
import FlashMessagesList from '../components/Flash/FlashMessagesList';
import requireAuth from '../utils/requireAuth';
import DashboardPage from '../components/DashBoardPage/DashboardPage';
import UserRoute from './UserRoute';
import GuestRoute from './GuestRoute';
import PropTypes from 'prop-types';
import CreateGroupPage from '../components/Groups/CreateGroupPage';
import GroupDetail from '../components/Groups/GroupDetail';
import MyGroupsPage from '../components/Groups/MyGroupsPage';
import MemberDetail from '../components/Members/MemberDetail';

const AppRouter = ({ location }) => (
    
    <div>
        <Header />
            <FlashMessagesList />
            <Switch>
                <Route location={location} exact path="/" component={HomePage}/>
                <Route location={location} exact path="/signup" component={SignUpPage}/>
                <GuestRoute location={location} exact path="/login" component={LoginPage}/>
                <UserRoute location={location} exact path="/dashboard" component={DashboardPage}/>
                <Route location={location} exact path="/groups" component={GroupsPage} />
                <Route location={location} exact path="/groups/new" component={requireAuth(CreateGroupPage)} />
                <Route location={location} exact path="/groups/:groupId" component={GroupDetail} />
                <Route location={location} exact path="/mygroups" component={requireAuth(MyGroupsPage)} />
                <Route location={location} exact path="/members" component={requireAuth(MembersPage)}/>
                <Route location={location} exact path="/members/detail" component={MemberDetail}/>
            </Switch>
    </div>
);

AppRouter.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default AppRouter;