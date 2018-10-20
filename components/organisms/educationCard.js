import React from 'react';
import SchoolList from '../molecules/schoolList';

const EducationCard = ({ education }) => (
    <div className="w3-container w3-card w3-white rest-height">
        <SchoolList education={education} />
    </div>
);

export default EducationCard;