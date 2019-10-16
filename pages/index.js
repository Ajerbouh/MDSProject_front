import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ReactDOM from "react-dom";
import AddProduct from '../components/AddProduct';
import Modal from '../components/Modal';
import Link from 'react';

/*if (typeof window !== 'undefined') {
    ReactDOM.render(<AddProduct/>, document.getElementById("form"));
}*/
export default class extends Component {

    async deleteProduct (id) {
        let products = this.state.products;
        const res = await fetch(`http://localhost/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const respons = await res.json();
        console.log(respons);
        if (respons.state === 1) {
            this.setState({
                products: products.filter(item => item.id !== id)
            })
        }
    }
    static async getInitialProps() {
        const res = await fetch('http://localhost/api/cars');
        const products = await res.json();
        return { products }
    }
    componentWillMount() {
        this.setState({
            products: this.props.products,
        })
    }
    render() {
        return (
            <container>
                <AddProduct/>
                {
                    this.state.products.map((product) =>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom>
                                        Product List
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                < CardActions>
                                    < Button size="small" onClick={(e) => {
                                        this.deleteProduct(product.id, e)
                                    }}>Supprimer le produit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            </container>
        )
    }
}