import React, {Component} from 'react';
import clsx from 'clsx';
import fetch from 'isomorphic-unfetch';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid, {GridSpacing} from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            <form onSubmit={this.handleSubmit} className={useStyles.container} noValidate autoComplete="off">
                <TextField
                    id="standard-full-width"
                    label="Nom voiture"
                    style={{margin: 8}}
                    placeholder="saisissez le nom de votre voiture"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <TextField
                    id="standard-full-width"
                    label="Prix"
                    style={{margin: 8}}
                    placeholder="Saisissez le prix de votre voiture"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.price}
                    onChange={this.handleChange}
                    type="number"
                />
                    <Button type="submit" variant="contained" className={useStyles.button}>
                        Ajouter un produit
                    </Button>
            </form>
        );
    }
}