import React from 'react';

const ProgressBar = ({ level }) => (
    <div className="w3-light-grey w3-round-xlarge w3-small">
        <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{width:level+'%'}}>{level}%</div>
    </div>
);

export default ProgressBar;