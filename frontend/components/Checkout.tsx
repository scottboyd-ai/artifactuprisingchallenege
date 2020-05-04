import React from "react";
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import $ from 'jquery';
import {mainTheme} from "../themes/mainTheme";
import {getCart, getProducts} from "../../services/RequestService";
import NavBar from "./NavBar";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: 700
    },
    table: {
        minWidth: 700,
    },
});

export function Checkout() {
    const classes = useStyles();

    const [init, setInit] = React.useState(true);
    const [cart, setCart] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [cartCount, setCartCount] = React.useState(0);

    const getRows = () => {
        const rowArray = [];
        for (const product of products) {
            for (const [productId, cartItem] of Object.entries(cart)) {
                const cartItemObj: any = cartItem;
                if (product.id === productId) {
                    rowArray.push({
                        name: product.name,
                        quantity: cartItemObj.quantity,
                        price: product.price
                    })
                }
            }
        }
        return rowArray;
    }

    const getSum = (count, price) => {
        return currencyFormat(count * price);

    }

    const currencyFormat = (num: number) => {
        return `${num.toFixed(2)}`;
    }

    const subtotal = (items) => {
        return items.map(({ price, quantity }) => price * quantity).reduce((sum, i) => sum + i, 0);
    }

    const invoiceSubtotal = subtotal(getRows());
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const purchaseItems = () => {
        $.ajax({
            url: '/purchase',
            type: 'POST',
            success: (response) => {
                alert('Purchase made! Thank you for your patronage!');
                window.location.href = '/';
            }
        })
    }

    if (init) {
        setInit(false);
        getCart(setCart, setCartCount);
        getProducts(setProducts);
    }


    return (
        <ThemeProvider theme={mainTheme}>
            <NavBar setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}>
                <Grid container>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <Grid container justify="center">
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                Details
                                            </TableCell>
                                            <TableCell align="right">Price</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Desc</TableCell>
                                            <TableCell align="right">Qty.</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Sum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getRows().map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">${row.price}</TableCell>
                                                <TableCell align="right">${getSum(row.quantity, row.price)}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={3}/>
                                            <TableCell colSpan={2}>Subtotal</TableCell>
                                            <TableCell align="right">${currencyFormat(invoiceSubtotal)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Tax</TableCell>
                                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                            <TableCell align="right">${currencyFormat(invoiceTaxes)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Total</TableCell>
                                            <TableCell align="right">${currencyFormat(invoiceTotal)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <Grid container justify="flex-end">
                            <Button href="/">Continue shopping</Button>
                            <Button onClick={purchaseItems}>Buy!</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
            </NavBar>
        </ThemeProvider>
    );
}