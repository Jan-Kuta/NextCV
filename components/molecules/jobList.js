import React from 'react';
import Job from './job';

const SkillList = ({ work }) => (
    <div className="w3-container">
        <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Work Experience</h2>
        {work.sort((a, b) => a.startDate < b.startDate ? 1 : -1).map((job) => <Job position={job.position} company={job.company} webpage={job.webpage} type={job.type} startDate={job.startDate} endDate={job.endDate} notes={job.notes} key={job.id} />)}
    </div>
);

export default SkillList;