import React from "react";
import { Component } from "react";
import c from "./BusinessCard.module.css";
import CardFront from "./CardFront/CardFront";
import CardBack from "./CardBack/CardBack";

class BusinessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _localStorageKeyName: 'skills',
            isVisible: false,
            name: 'Kiril Matsiuk',
            occupation: 'Frontend Developer',
            skills: [
                'JavaScript',
                'React.js',
                'HTML+CSS',
                'Axios',
                'Webpack/Gulp'
            ]
        }
    }
    addSkill = (skill) => {
        this.setState({skills: [...this.state.skills, skill]});
    }
    flipCard = (e) => {
        if(!e.target.className.includes('holdersEmail') && !e.target.className.includes('holdersTel') && !e.target.className.includes('add_input')) {
            this.state.isVisible ? this.setState({isVisible: false}) : this.setState({isVisible: true});
        }
    }
    render() {
        return (
            <section onClick={(e) => this.flipCard(e)} className={c.businessCard}>
                <CardFront name={this.state.name} occupation={this.state.occupation} />
                <CardBack isVisible={this.state.isVisible} skills={this.state.skills} addSkill={this.addSkill} />
            </section>
        )
    }
}

export default BusinessCard;