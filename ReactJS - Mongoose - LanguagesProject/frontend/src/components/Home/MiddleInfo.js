import React from "react";
import { Link } from 'react-router-dom';

const MiddleInfo = props => (
        <div className="col-sm-3">
          <div className="box">
            <img className="card-img-top" src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f34d31b7b293d187d4b134d6afcabba9&auto=format&fit=crop&w=400&q=400" alt="Card image cap"></img>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <Link to={"/groups/" + props._id}><button className="btn btn-danger">Mais detalhes</button></Link>
          </div>
      </div>
);

export default MiddleInfo;
