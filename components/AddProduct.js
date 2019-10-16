import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Nom de l\'automobile',
            price: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.type === "text") {
            this.setState({
                name: event.target.value,
            });
        } else if (event.target.type === "number") {
            this.setState({
                price: event.target.value,
            });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name;
        const price = this.state.price;

        const res = await fetch('http://localhost/api/cars', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, price})
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nom :
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label>
                    Prix :
                    <input type="number" value={this.state.price} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Envoyer"/>
            </form>
        );
    }
}