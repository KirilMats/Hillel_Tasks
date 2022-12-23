import React from "react";
import c from "./CardBack.module.css";

const CardBack = ({isVisible}) => {
    return (
        <div className={`${c.businessCard_back} ${isVisible ? c.visible : ''}`}>
            <ul className={c.skillSet}>
                <li className={c.skill}>JavaScript</li>
                <li className={c.bull}>&#10070;</li>
                <li className={c.skill}>React.js</li>
                <li className={c.bull}>&#10070;</li>
                <li className={c.skill}>HTML+CSS</li>
                <li className={c.bull}>&#10070;</li>
                <li className={c.skill}>Axios</li>
                <li className={c.bull}>&#10070;</li>
                <li className={c.skill}>Webpack/Gulp</li>
            </ul>
        </div>
    )
}

export default CardBack;