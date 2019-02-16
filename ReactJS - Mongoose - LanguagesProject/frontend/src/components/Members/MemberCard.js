import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const MemberCard = (props) => (
    <div className="col-md-4">
        <div className="card" style={{width: '18rem'}}>
            <img src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f34d31b7b293d187d4b134d6afcabba9&auto=format&fit=crop&w=400&q=400" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{props.firstName}</h5>
                <p className="card-text">{props.email}</p>
                <Link to={{ pathname: '/members/detail', state: { ...props } }}><button className="btn btn-primary">Mais detalhes</button></Link>
            </div>
        </div>
    </div>
);

export default MemberCard;