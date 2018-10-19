import React from 'react';
import ProgressBar from '../atoms/progressBar';

const Job = ({ position, company, type, startDate, endDate, notes }) => (
    <div className="w3-container">
        <h5 className="w3-opacity"><b>{position} / {company} ({type})</b></h5>
        <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right"></i>{startDate} - {endDate ? endDate : (<span className="w3-tag w3-teal w3-round">Current</span>)}</h6>
        <p dangerouslySetInnerHTML={{__html: notes}} />
        <br />
    </div>
);

export default Job;