
import React from 'react';
import UserCard from '../organisms/userCard';
import JobCard from '../organisms/jobCard';
import EducationCard from '../organisms/educationCard';
import Navigation from '../organisms/navigation';

const CVTemplate = ({ user }) => (
    <React.Fragment>
        <Navigation />
        <div className="navigation">
            <div className="w3-content w3-margin-top w3-margin-bottom">
                <div className="w3-row-padding">
                    {/* Left Column */}
                    <div className="w3-third">
                        <UserCard user={user} />
                    </div>
                    {/* Right Column */}
                    <div className="w3-twothird">
                        <div className="full-height flex-column">
                            <JobCard work={user.work} />
                            <EducationCard education={user.education} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
);

export default CVTemplate;