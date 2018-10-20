import React from 'react';
import School from './school';

const SchoolList = ({ education }) => (
    <div>
        <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Vzdělání</h2>
        {education.sort((a, b) => a.startDate < b.startDate ? 1 : -1).map((school) => <School schoolName={school.schoolName} faculty={school.faculty} major={school.major} degree={school.degree} startDate={school.startDate} endDate={school.endDate} thesis={school.thesis} key={school.id} />)}
    </div>
);

export default SchoolList;