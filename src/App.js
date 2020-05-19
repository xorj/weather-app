import React, { Component } from "react";
import "./App.css";
import SearchBar from "../src/components/SearchBar/SearchBar";
import WeatherCard from "../src/components/WeatherCard/WeatherCard";
import axios from "../src/axios";
import BottomAppBar from "./components/bottomAppBar";
import LogoBar from "./components/LogoBar";
import LoadSpinner from "./components/LoadSpinner";
import Alert from "@material-ui/lab/Alert";

class App extends Component {
  state = {
    API_KEY: "nHaEPuHK74q1rWtRCQf6cTtXfBGxPESL",
    CITY_QUERY: "",
    hasInfo: false,
    isLoading: false,
    error: false,
    errorMessage: null,
    city: {
      key: null,
      name: null,
      administrativeArea: null,
      country: null,
    },
    forecast: {
      description: [null, null],
      temperature: {
        minimum: null,
        maximum: null,
      },
    },
  };
  searchHandler = () => {
    this.setState({ isLoading: true, error: false, errorMessage: null });
    axios
      .get(
        "/locations/v1/cities/search?apikey=" +
          this.state.API_KEY +
          "&q=" +
          this.state.CITY_QUERY
      )
      .then((response) => {
        this.setState({
          city: {
            key: response.data[0]["Key"],
            name: response.data[0]["LocalizedName"],
            country: response.data[0]["Country"]["ID"],
            administrativeArea:
              response.data[0]["AdministrativeArea"]["LocalizedName"],
          },
        });
        this.getCityForecast();
      })
      .catch((error) => {
        this.setState({ error: true, errorMessage: "City not found." });
      });
  };

  getCityForecast = () => {
    axios
      .get(
        `/forecasts/v1/daily/1day/${this.state.city.key}?apikey=%09${this.state.API_KEY}`
      )
      .then((response) => {
        console.log(response);

        this.setState({
          data: response.data,
          forecast: {
            description: [
              response.data["DailyForecasts"][0]["Day"]["Icon"],
              response.data["DailyForecasts"][0]["Day"]["IconPhrase"],
              response.data["DailyForecasts"][0]["Night"]["Icon"],
              response.data["DailyForecasts"][0]["Night"]["IconPhrase"],
            ],
            temperature: {
              minimum:
                response.data["DailyForecasts"][0]["Temperature"]["Minimum"][
                  "Value"
                ],
              maximum:
                response.data["DailyForecasts"][0]["Temperature"]["Maximum"][
                  "Value"
                ],
            },
          },
        });
        setTimeout(() => {
          this.setState({
            hasInfo: true,
            isLoading: false,
          });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: true, errorMessage: "Something went wrong." });
      });
  };

  changeHandler = (event) => {
    this.setState({ CITY_QUERY: event.target.value });
  };

  render() {
    let content = null;
    if (this.state.error) {
      content = <Alert severity="error">{this.state.errorMessage}</Alert>;
    } else {
      if (!this.state.hasInfo && !this.state.isLoading) {
        content = <h2>Please search for a city.</h2>;
      } else if (this.state.isLoading) {
        content = <LoadSpinner />;
      } else {
        content = (
          <WeatherCard
            city={this.state.city.name}
            state={this.state.city.administrativeArea}
            country={this.state.city.country}
            dayIcon={this.state.forecast.description[0]}
            dayPhrase={this.state.forecast.description[1]}
            nightIcon={this.state.forecast.description[2]}
            nightPhrase={this.state.forecast.description[3]}
            min={this.state.forecast.temperature["minimum"]}
            max={this.state.forecast.temperature["maximum"]}
          />
        );
      }
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <LogoBar color="default">
          <span
            className="material-icons"
            style={{ fontSize: "36px", padding: "5px", color: "#3f51b5" }}
          >
            cloud
          </span>
          <h2 style={{ color: "#3f51b5" }}>weather-app</h2>
        </LogoBar>
        {content}
        <BottomAppBar color="default">
          <SearchBar
            query={this.state.CITY_QUERY}
            changed={this.changeHandler}
            search={this.searchHandler}
            autoFocus="true"
          />
        </BottomAppBar>
      </div>
    );
  }
}

export default App;
