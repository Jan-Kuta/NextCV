import React from 'react';
import ProgressBar from '../atoms/progressBar';

const Skill = ({ title, level }) => (
    <div>
        <p>{title}</p>
        <ProgressBar level={level} />
    </div>
);

export default Skill;