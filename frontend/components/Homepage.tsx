import React from "react";
import {filterProducts, getCart, getProducts, saveCart} from "../../services/RequestService";
import {Box, Button, Card, CardActions, CardContent, Grid, ThemeProvider, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {mainTheme} from "../themes/mainTheme";
import NavBar from "./NavBar";

export function Homepage() {
    const [init, setInit] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState({});
    const [cartCount, setCartCount] = React.useState(0);

    const getProductById = (productId) => {
        return products.find((product) => {
            return product.id === productId;
        });
    }

    const getItemQuantity = (productId) => {
        const product = getProductById(productId);
        if (product) {
            return product.quantity;
        } else {
            return 0;
        }
    }

    const getCartQuantity = (productId) => {
        return cart && cart[productId] ? cart[productId].quantity : 0;
    }

    const addItemToCart = (productId) => {
        const product = getProductById(productId);
        if (product && product.quantity > 0) {
            let newCart: any = {};
            if (!cartCount) {
                newCart[productId] = {
                    quantity: 1
                };
            } else if (!cart[productId]) {
                newCart = {...cart};
                newCart[productId] = {
                    quantity: 1
                };
            } else {
                newCart = {...cart};
                newCart[productId] = {
                    quantity: cart[productId].quantity + 1
                };
            }
            setCart(newCart);
            const newCount = cartCount + 1;
            setCartCount(newCount);
            saveCart(newCart);
        }
    }

    const removeItemFromCart = (productId) => {
        const product = getProductById(productId);
        if (product) {
            let newCart: any = {};
            if (!cartCount) {
                return;
            } else if (cart && cart[productId]) {
                newCart = cart;
                const newProductCount = cart[productId].quantity - 1;
                if (newProductCount >= 0) {
                    newCart[productId] = {
                        quantity: cart[productId].quantity - 1
                    };
                } else {
                    delete newCart[productId];
                }
                setCart(newCart);
                const newCount = cartCount - 1;
                setCartCount( newCount);
                saveCart(newCart);
            }
        }
    }

    const addButtonDisabled = (productId) => {
        const originalProduct = getProductById(productId);
        let originalProductQuantity = 0;
        if (originalProduct) {
            originalProductQuantity = originalProduct.quantity;
        }
        const cartQuantity = cart && cart[productId] ? cart[productId].quantity : 0;

        return originalProductQuantity - cartQuantity <= 0;
    }

    const removeButtonDisabled = (productId) => {
        return (!cartCount || (!cart[productId] || (cart[productId] && cart[productId].quantity <= 0)));
    }

    const productsToItems = () => {
        if (products && products.length) {
            return products.map((product, i) => {
                return (
                    <Grid item key={i}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {product.name}
                                </Typography>
                                <Typography>
                                    ${product.price}
                                </Typography>
                                <Rating value={product.rating} precision={0.1} readOnly size="small"/>
                                <Typography>
                                    {product.rating} / 5
                                </Typography>
                                <Typography>
                                    {getItemQuantity(product.id)} in stock
                                </Typography>
                                <Typography>
                                    {getCartQuantity(product.id)} in cart
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => {addItemToCart(product.id)}} disabled={addButtonDisabled(product.id)}>Add to cart</Button>
                                <Button size="small" onClick={() => {removeItemFromCart(product.id)}} disabled={removeButtonDisabled(product.id)}>Remove from cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })
        }
    }

    if (init) {
        setInit(false);
        getProducts(setProducts);
        getCart(setCart, setCartCount);
    }

    return (
        <ThemeProvider theme={mainTheme}>
            <NavBar setCart={setCart} cartCount={cartCount} setCartCount={setCartCount} filterProducts={filterProducts} setProducts={setProducts}>
                <Box>
                    <Grid container spacing={2}>
                        {productsToItems()}
                    </Grid>
                </Box>
            </NavBar>
        </ThemeProvider>
    );
}