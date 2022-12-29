import React from "react";
import c from "./CardBack.module.css";
import Skill from "./Skill/Skill";
import AddSkill from "./AddSkill/AddSkill";

const CardBack = ({isVisible, skills, addSkill}) => {
    return (
        <div className={`${c.businessCard_back} ${isVisible ? c.visible : ''}`}>
            <AddSkill addSkill={addSkill} />
            <ul className={c.skillSet}>
                {skills.map((skill, index) => <Skill key={index} skill={skill} lastSkill={skills[skills.length-1]} />)}
            </ul>
        </div>
    )
}

export default CardBack;