import {grey, teal} from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core';

export const mainTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: teal["300"]
        },
        secondary: {
            main: grey['50']
        }
    },
    overrides: {
        MuiIconButton: {
            root: {
                '&:not(:disabled):hover': {
                    backgroundColor: teal['50']
                },
                // '&:not(:disabled)': {
                //     color: teal['300']
                // },
                marginRight: 2,
                marginLeft: 2
            },
            colorPrimary: {
                color: teal[300]
            },
            colorSecondary: {
                color: grey[500]
            }
        },
        MuiButton: {
            root: {
                backgroundColor: grey['50'],
                '&:hover': {
                    color: teal['300']
                },
                marginRight: 2,
                marginLeft: 2
            }
        },
        MuiContainer: {
            root: {
                paddingTop: 30,
                paddingBottom: 30
            }
        },
        MuiListItemIcon: {
            root: {
                paddingLeft: 5
            }
        }
    }
});