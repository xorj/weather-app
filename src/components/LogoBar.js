import React from 'react';
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    div: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    h3: {
        lineHeight: "15px",
        color: "#3f51b5",
        fontWeight: "700",
    }
})
const LogoAppBar = (props) => {
    const classes = useStyles();
    return <AppBar color="default">
        <div className={classes.div}>
        <span className="material-icons" style={{fontSize: "36px", padding: "5px", color: "#3f51b5"}}>
              cloud
        </span>
        <h3 className={classes.h3}>Weather App</h3>
        <a href="https://github.com/xorj" className="material-icons" target="_blank" rel="noopener noreferrer" style={{fontSize: "24px", padding: "5px", color: "lightgray", textDecoration: "none", marginRight: "5px"}}>
            info
           
            </a>   
        </div>
    </AppBar>
}

export default LogoAppBar;