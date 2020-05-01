import {
    Button,
    ClickAwayListener, createStyles, Drawer,
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
            backgroundColor: "primary"
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
    }),
);

export default function NavBar(props) {
    const classes = useStyles({});

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);


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
                                    color={props.cart && props.cart.length ? "primary" : "secondary"}
                                >
                                    <ShoppingCart fontSize="large"/>
                                </IconButton>
                                {menuOpen ? (
                                    <Paper className={classes.paper}>
                                        <div><Button href="/checkout">Checkout</Button></div>
                                        <div><Button href="/clear">Clear Cart</Button></div>
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
                    <List>
                        <ListItem key="Categories">
                            <ListItemIcon>
                                <Dashboard/>
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {props.children}
                </main>
        </div>
    );
}