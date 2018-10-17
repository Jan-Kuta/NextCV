import React from 'react';

const UserInfo = ({ user }) => (
    <div>
        <div className="w3-display-container">
            <img src={user.image} style={{width:'100%'}} alt={user.username} />
            <div className="w3-display-bottomleft w3-container w3-text-black">
                <h2>{`${user.firstname} ${user.lastname}`}</h2>
            </div>
        </div>
        <div className="w3-container">
            <p><i className="fa fa-star fa-fw w3-margin-right w3-large w3-text-teal"></i>{new Date(user.birthdate).toLocaleDateString('cs')}</p>
            <p><i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.address}</p>
            <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.email}</p>
            <p><i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.phone}</p>
            <p><i className="fa fa-car fa-fw w3-margin-right w3-large w3-text-teal"></i>{user.drivingLicence}</p>
        </div>
    </div>
);

export default UserInfo;