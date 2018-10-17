import React from 'react';
import SkillList from '../molecules/skillList';
import UserInfo from '../molecules/userInfo';

const UserCard = ({ user }) => (
    <div className="w3-white w3-text-grey w3-card-4" style={{height: '100%'}}>
        <UserInfo user={user} />
        <hr />
        <SkillList skills={user.skills} />
    </div>
);

export default UserCard;