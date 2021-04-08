import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UbiNativeSelect from "./UbiNativeSelect";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function UbiNav(props) {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        ubiCov
                    </Typography>
                    <UbiNativeSelect dataToShow={props.dataToShow} updatedDataShown={props.updatedDataShown}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
