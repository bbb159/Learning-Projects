import React, { Component } from 'react';

const MemberDetail = (props) => (
    <div>
        <div>
            {props.location.state.firstName}
        </div>
        <div>
            {props.location.state.lastName}
        </div>
        <div>
            {props.location.state.email}
        </div>
    </div>
);

export default MemberDetail;