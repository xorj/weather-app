import React from "react";
import { Fab, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bar: {
    width: "95%",
    display: "flex",
    alingItems: "space-between",
  },
  input: {
    flexGrow: "1",
    padding: "5px",
    margin: "5px",
  },
  button: {
    padding: "5px",
    margin: "5px",
  },
});

const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={classes.bar}>
        <Input
          variant="filled"
          className={classes.input}
          type="text"
          value={props.query}
          onChange={props.changed}
          placeholder="Enter a city..."
          autoFocus
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              props.search();
            }
          }}
        />
        <Fab
          className={classes.button}
          color="primary"
          onClick={props.search}
        >
          <SearchIcon />
        </Fab>
      </div>
    </div>
  );
};

export default SearchBar;
