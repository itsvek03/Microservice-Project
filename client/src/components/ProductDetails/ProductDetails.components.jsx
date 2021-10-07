import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { checkIfLoggedIn } from '../../utils/login.util'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';


const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function ProductDetails({ match }) {
    const [singleProduct, setSingleProduct] = useState({})
    const [indQuantity, setindQuantity] = useState(1)
    const [usaQuantity, setusaQuantity] = useState(1)
    const history = useHistory();

    const getStocks = useCallback(
        () => {
            axios.get(`http://localhost:2000/api/products/${match.params.sku}`).then((response) => {
                console.log("Response", response.data)
                setSingleProduct(response.data.products)
            })
        }, []
    )

    useEffect(() => {
        getStocks()
    }, [])


    const handleChangeindQuantity = (e) => {
        setindQuantity(e.target.value);
    }

    const handleChangeusaQuantity = (e) => {
        setusaQuantity(e.target.value);
    }

    const handleChangeStocksQuantity = (type) => {
        return function (e) {

            if (!checkIfLoggedIn()) {
              
                history.push('/login')
                return
            }


            const data = {
                quantity: type === 'ind' ? indQuantity : usaQuantity
            }
            axios.patch(`http://localhost:8000/api/stock/${match.params.sku}/${type}`, data).then((response) => {
                console.log(response)
                alert(response.data.message)
                getStocks()
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })

        }
    }


    if (!singleProduct.priceDetails) {
        return null
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 mt-3">
                    <img className="img-responsive" src="https://media.istockphoto.com/photos/front-of-men-cut-black-tshirt-isolated-on-white-background-picture-id1142212002?k=20&m=1142212002&s=612x612&w=0&h=KlgIb_GW0e6ZtIF5A4dxJ1n1KS19WV8Hpc8MpHkw6_o=" />
                </div>

                <div className="col-md-3 mt-5">
                    <Typography variant="h5">Product :</Typography>
                    <Typography variant="h5">Product Code :</Typography>
                    <Typography variant="h5">Price INR :</Typography>
                    <Typography variant="h5"> PRICE USD :</Typography>

                    <Typography variant="h5"> Quantity Availbale IND :</Typography>
                    <br />
                    <br />
                    <br />

                    <br />
                    <br />
                    <br />
                    <Typography variant="h5"> Quantity Availbale USD :</Typography>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Typography variant="h5"> INR Cart Purchased :</Typography>
                    <br />
                    <br />
                    <Typography variant="h5"> USD Cart Purchased :</Typography>
                    <br />
                    <br />
                    <Typography variant="h5"> Total Stock Available  :</Typography>
                    <br />
                    <br />
                    <Typography variant="h5"> Total Stock Purchased :</Typography>





                </div>
                <div className="col-md-3 mt-5">
                    <Typography variant="h5">{singleProduct.product_name}</Typography>
                    <Typography variant="h5"> {singleProduct.product_sku}</Typography>
                    <Typography variant="h5"> {singleProduct.priceDetails.product_inr}</Typography>
                    <Typography variant="h5">{singleProduct.priceDetails.product_usd}</Typography>

                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={singleProduct.stockDetails.stock.ind.ind_available} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                    <input
                        type="text"
                        className="form-control"
                        name="" id=""
                        value={indQuantity}
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={handleChangeindQuantity}
                    />
                    <button
                        type="button"
                        className="btn btn-primary m-2"
                        onClick={handleChangeStocksQuantity("ind")}
                    >Add to Cart</button>
                    <br />
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={singleProduct.stockDetails.stock.usd.usd_available} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                    <input type="text"
                        value={usaQuantity}
                        className="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        onChange={handleChangeusaQuantity}
                    />
                    <button type="button" className="btn btn-primary m-2"
                        onClick={handleChangeStocksQuantity("usd")}
                    >Add to Cart</button>



                    <Typography variant="h5">{singleProduct.stockDetails.stock.ind.ind_purchased}</Typography>
                    <br />
                    <br />
                    <Typography variant="h5">{singleProduct.stockDetails.stock.usd.usd_purchased}</Typography>
                    <br />
                    <br />

                    <Typography variant="h5">{singleProduct.stockDetails.total_available_stock}</Typography>
                    <br />
                    <br />


                    <Typography variant="h5">{singleProduct.stockDetails.total_purchased}</Typography>
                </div>

            </div>

        </div>
    )
}
