import React from 'react';
import SkillList from '../molecules/skillList';
import UserInfo from '../molecules/userInfo';

const UserCard = ({ user }) => (
    <div className="w3-white w3-text-grey w3-card-4 full-height">
        <UserInfo user={user} />
        <br />
        <SkillList skills={user.skills} />
        <br />
    </div>
);

export default UserCard;