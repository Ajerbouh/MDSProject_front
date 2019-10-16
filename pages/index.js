import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AddProduct from '../components/AddProduct';


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default class extends Component {


    async deleteProduct(id) {
        let products = this.state.products;
        const res = await fetch(`http://localhost/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const respons = await res.json();
        if (respons.state === 1) {
            this.setState({
                products: products.filter(item => item.id !== id)
            })
        }
    }

    static async getInitialProps() {
        const res = await fetch('http://localhost/api/cars');
        const products = await res.json();
        return {products}
    }

    componentWillMount() {
        this.setState({
            products: this.props.products,
        })
    }

    render() {
        return (
            <Grid container className={useStyles.root} spacing={2}>
                {
                    this.state.products.map((product) =>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={useStyles.spacing}>
                                <Grid key={useStyles.value} item>
                                    <Card className={useStyles.card}>
                                        <CardContent>
                                            <Typography color="textSecondary" className={useStyles.title} gutterBottom>
                                                Product List
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {product.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            < Button size="small" onClick={(e) => {
                                                this.deleteProduct(product.id, e)
                                            }}>Supprimer le produit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <AddProduct/>
                </Grid>
            </Grid>
        )
    }
}