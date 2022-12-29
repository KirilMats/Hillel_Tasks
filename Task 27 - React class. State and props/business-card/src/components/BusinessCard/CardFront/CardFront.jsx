import React from "react";
import c from "./CardFront.module.css";

const CardFront = ({name, occupation}) => {
    return (
        <div className={c.businessCard_front}>
            <a className={c.holdersEmail} href="mailto:mfkirill7@gmail.com">mfkirill7@gmail.com</a>
            <div className={c.nameAndOccupation}>
                <h1 className={c.holderName}>{name}</h1>
                <div className={c.divider}></div>
                <h2 className={c.holdersOccupation}>{occupation}</h2>
            </div>
            <a className={c.holdersTel} href="tel:+380931602289">+380931602289</a>
        </div>
    )
}

export default CardFront;