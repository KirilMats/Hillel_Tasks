import c from "./Skill.module.css";
import React from "react";

const Skill = ({skill, lastSkill}) => {
    return (
        <>
            <li className={c.skill}>{skill}</li>
            {lastSkill !== skill ? <li className={c.bull}>&#10070;</li> : null}
        </>
    )
}

export default Skill;