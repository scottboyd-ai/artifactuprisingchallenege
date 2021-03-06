import {
    Badge,
    Button,
    ClickAwayListener, Collapse, createStyles, Drawer,
    IconButton, List, ListItem, ListItemIcon, ListItemText,
    makeStyles, Paper, Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {grey} from "@material-ui/core/colors";
import {Dashboard, ChevronLeft, ShoppingCart} from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import * as React from "react";
import {clearCart} from "../../services/CartService";
import { getCategories } from "../../services/RequestService";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1
        },
        title: {
            flexGrow: 1
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: '20px',
            backgroundColor: grey['50']
        },
        paper: {
            position: 'absolute',
            backgroundColor: "primary",
            right: '0px',
            '& a': {
                width: "100%"
            }
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export default function NavBar(props) {
    const classes = useStyles({});

    const [init, setInit] = React.useState(true);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    const handleMenuClick = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleMenuClickAway = () => {
        setMenuOpen(false);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const categoriesToElements = () => {
        return categories.map((category) => {
            return (
                <ListItem key={category.id} button className={classes.nested} onClick={() => {props.filterProducts(category.id, props.setProducts)}}>
                    <ListItemText primary={category.name} />
                </ListItem>
            );
        })
    }

    if (init) {
        setInit(false);
        getCategories(setCategories);
    }

    return (
        <div className={classes.root}>
                <AppBar

                    position="fixed"
                    color="secondary"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: drawerOpen,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: drawerOpen,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Artifact Uprising
                        </Typography>
                        {/*Right Side*/}
                        <ClickAwayListener onClickAway={handleMenuClickAway}>
                            <div>
                                <IconButton
                                    aria-label="shopping cart"
                                    onClick={handleMenuClick}
                                    color={props.cartCount ? "primary" : "secondary"}
                                >
                                    <Badge badgeContent={props.cartCount}>
                                        <ShoppingCart fontSize="large"/>
                                    </Badge>
                                </IconButton>
                                {menuOpen ? (
                                    <Paper className={classes.paper}>
                                        <div><Button href="/checkout">Checkout</Button></div>
                                        <div><Button onClick={() => clearCart(props.setCart, props.setCartCount, setMenuOpen)}>Clear Cart</Button></div>
                                    </Paper>
                                ) : null}
                            </div>
                        </ClickAwayListener>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: drawerOpen,
                            [classes.drawerClose]: !drawerOpen,
                        }),
                    }}
                    open={drawerOpen}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeft/>
                        </IconButton>
                    </div>
                    <ListItem>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItem>
                    <List component="div" disablePadding>
                        <ListItem key="all" button className={classes.nested} onClick={() => {props.filterProducts(null, props.setProducts)}}>
                            <ListItemText primary="All" />
                        </ListItem>
                        {categoriesToElements()}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {props.children}
                </main>
        </div>
    );
}