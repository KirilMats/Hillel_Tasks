import React from "react";
import { Component } from "react";
import c from "./BusinessCard.module.css";
import CardFront from "./CardFront/CardFront";
import CardBack from "./CardBack/CardBack";

class BusinessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: 'Kiril Matsiuk',
            occupation: 'Frontend Developer'
        }
    }
    flipCard = (e) => {
        if(!e.target.className.includes('holdersEmail') && !e.target.className.includes('holdersTel')) {
            this.state.isVisible ? this.setState({isVisible: false}) : this.setState({isVisible: true});
        }
    }
    render() {
        return (
            <section onClick={(e) => this.flipCard(e)} className={c.businessCard}>
                <CardFront name={this.state.name} occupation={this.state.occupation} />
                <CardBack isVisible={this.state.isVisible} />
            </section>
        )
    }
}

export default BusinessCard;