import React from 'react';
import { Switch } from 'react-router-dom';
import LoginPage from '../components/Login/LoginPage';
import Header from '../components/Header';
import UserRouter from './UserRouter';
import GuestRouter from './GuestRouter';
import CharactersPage from '../components/Item/CharactersPage';
import CreatorsPage from '../components/Item/CreatorsPage';
import SeriesPage from '../components/Item/SeriesPage';
import '../styles/root.css';
const AppRouter = () => (
    <div className="root">
        <Header />
        <Switch>
            <GuestRouter exact path="/" component={LoginPage} />
            <UserRouter exact path="/personagens" component={CharactersPage} />
            <UserRouter exact path="/autores" component={CreatorsPage} />
            <UserRouter exact path="/series" component={SeriesPage} />
            <GuestRouter exact path="*" component={LoginPage} />
        </Switch>
    </div>
);

export default AppRouter;