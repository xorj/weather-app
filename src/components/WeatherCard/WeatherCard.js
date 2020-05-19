import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    margin: "64px auto",
    padding: "10px",
    height: "500px",
    width: "95%",
    maxWidth: "600px",
  },
  cityInfo: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    "& > *": {
      margin: "0",
      padding: "0",
    },
  },
  location: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      fontWeight: "4 00",
      padding: "5px",
      margin: "0",
    },
  },
  date: {
    "&>*": {
      margin: "0",
      padding: "5px",
      fontWeight: "300",
    },
  },
  flag: {
    height: "24px",
    backgroundColor: "#9bc0ff",
    borderRadius: "16px"
  },
  weatherIcon: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    width: "100%",
    "&>img": {
      backgroundColor: "#9bc0ff",
      height: "100px",
      borderRadius: "50px"
    },
    "&>h2": {
      margin: "0",
    padding: "5px"
      }  
  },
  temperatures: {
    width: "90%",
    padding: "10px 0",
    backgroundColor: "#3d5afe",
    borderRadius: "10px",
    boxShadow: "-5px -5px 1px 0px rgba(0,0,0, 0.2)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      color: "#fff",
      padding: "5px",
      fontSize: "3.5rem",
      margin: "0",
      "& sup": {
        fontSize: "1.75rem",
      },
    },
    "& h3": {
      color: "#fff",
      fontWeight: "400",
      padding: "5px",
      fontSize: "2rem",
      margin: "0",
      "& sup": {
        fontSize: "1rem",
      },
    },
  },
});
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let today = new Date();

const WeatherCard = (props) => {
  const classes = useStyles();
  let hours = today.getHours();
  let icon = null;
  let phrase = null;
  if (hours < 6 || hours >= 18) {
    icon = props.nightIcon;
    phrase = props.nightPhrase;
  } else {
    icon = props.dayIcon;
    phrase = props.dayPhrase;
  }
  return (
    <div className={classes.card}>
      <div className={classes.cityInfo}>
        <div className={classes.location}>
          <h2>{props.city + ", " + props.state}</h2>
          <img
            className={classes.flag}
            src={`https://www.countryflags.io/${props.country}/flat/64.png`}
            alt={props.country}
          />
        </div>
        <div className={classes.date}>
          <h3>
            {month[today.getMonth().toString()] +
              ", " +
              today.getDate().toString()}
          </h3>
        </div>
      </div>
      <div className={classes.weatherIcon}>
        <img src={`/img/weather-icons/${icon}-s.svg`} alt={"Icon not found."} />
            <h2>{phrase}</h2>
      </div>
      <div className={classes.temperatures}>
        <h1>
          {(((props.max - 32) * 5) / 9).toFixed(1)}
          <sup>°C</sup>
        </h1>
        <h3>
          {(((props.min - 32) * 5) / 9).toFixed(1)}
          <sup>°C</sup>
        </h3>
      </div>
    </div>
  );
};

export default WeatherCard;
