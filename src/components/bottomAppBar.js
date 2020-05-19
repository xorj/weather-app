import React from 'react';
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    appBar: {
        display: "flex",
        alignItems: "flex-end",
        top: 'auto',
        bottom: 0,
    },
})
const BottomAppBar = (props) => {
    const classes = useStyles();
    return <AppBar color={props.color} className={classes.appBar}>
        {props.children}
    </AppBar>
}

export default BottomAppBar;