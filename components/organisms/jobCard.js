import React from 'react';
import JobList from '../molecules/jobList';

const JobCard = ({ work }) => (
    <div className="w3-container w3-card w3-white w3-margin-bottom">
        <JobList work={work} />
    </div>
);

export default JobCard;