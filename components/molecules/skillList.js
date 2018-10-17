import React from 'react';
import Skill from './skill';

const SkillList = ({ skills }) => (
    <div className="w3-container">
        <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Skills</b></p>
        {skills.map((skill) => <Skill title={skill.title} level={skill.level} key={skill.id} />)}
    </div>
);

export default SkillList;