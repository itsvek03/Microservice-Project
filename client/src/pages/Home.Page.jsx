import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
    });
    const classes = useStyles();

    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:2000/api/products').then((response) => {
            setDetails(response.data.products)
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">

                {
                    (details.length === 0 ? 'No Products in the store' : details.map((items) => {
                        return (
                            <div className="col-md-4 mt-5">
                                <NavLink to={{ pathname: `/${items.product_sku}` }}>
                                    <Card className={classes.root} key={items.id}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Product"
                                                height="140"
                                                image="https://media.istockphoto.com/photos/front-of-men-cut-black-tshirt-isolated-on-white-background-picture-id1142212002?k=20&m=1142212002&s=612x612&w=0&h=KlgIb_GW0e6ZtIF5A4dxJ1n1KS19WV8Hpc8MpHkw6_o="
                                                title="Products"

                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {items.product_sku}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {items.product_name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>

                                    </Card>
                                </NavLink>
                            </div>
                        )
                    }))
                }

            </div>
        </div>

    );
}

export default Home;
