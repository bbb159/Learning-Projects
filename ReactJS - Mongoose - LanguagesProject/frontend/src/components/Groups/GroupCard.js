import React from "react";
import { Link } from 'react-router-dom';

const GroupCard = (props) => (
  <div className="py-3">
    <div className="card">
      <div className="row">
        <div className="col-md-4">
          <img src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f34d31b7b293d187d4b134d6afcabba9&auto=format&fit=crop&w=400&q=400" className="w-100" />
        </div>
        <div className="col-md-8 px-3">
          <div className="card-block px-3">
            <h4 className="card-title">{props.name}</h4>
            <p className="card-text"><b>Idioma: </b>{props.language}</p>
            <p className="card-text"><b>Descrição: </b>{props.description}</p>
            <p className="card-text"><b>Localização: </b>{props.location}</p>
            <p className="card-text"><b>Nível: </b>{props.level}</p>
            <p className="card-text">{props.numberOfComments}</p>
            <Link to={"/groups/" + props.groupId}><button className="btn btn-primary">Mais detalhes</button></Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GroupCard;
