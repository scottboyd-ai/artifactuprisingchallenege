import React from "react";
import $ from 'jquery';
import {Box, Button, Card, CardActions, CardContent, Grid, ThemeProvider, Typography} from "@material-ui/core";
import NavBar from "./NavBar";
import {mainTheme} from "../themes/mainTheme";

function App() {
    const [init, setInit] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState([]);


    const getProducts = () => {
        $.ajax({
            url: '/products',
            type: 'GET',
            success: (response) => {
                setProducts(response);
            }
        })
    }

    const addItemToCart = (itemId) => {
        let newCart = [];
        if (!cart) {
            newCart.push(itemId);
        } else {
            newCart = [...cart, itemId];
        }
        setCart(newCart);
        saveCart(newCart);
    }

    const getCart = () => {
        $.ajax({
            url: '/cart',
            type: 'GET',
            success: (response) => {
                setCart(response);
            }
        })
    }

    const saveCart = (newCart) => {
        $.ajax({
            url: '/cart',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({cart: newCart})
        })
    }

    const productsToItems = () => {
        if (products && products.length) {
            return products.map((item, i) => {
                return (
                    <Grid item key={i}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    {item.name}
                                </Typography>
                                <Typography>
                                    ${item.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => {addItemToCart(item.id)}}>Add to cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })
        }
    }

    if (init) {
        setInit(false);
        getProducts();
        getCart();
    }

    return (
        <ThemeProvider theme={mainTheme}>
            <NavBar cart={cart}>
                <Box>
                    <Grid container spacing={2}>
                        {productsToItems()}
                    </Grid>
                </Box>
            </NavBar>
        </ThemeProvider>
    );
}

export default App;