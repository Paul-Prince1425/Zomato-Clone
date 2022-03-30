import React, { Component } from "react";
import "../Styles/Home.css";
import QuickSearch from "./QuickSearch";
import Wallpaper from "./Wallpaper";
import axios from "axios";

export class Home extends Component {
  constructor() {
    super();

    this.state = {
      locations: [],
      mealtypes: [],
    };
  }
  componentDidMount() {
    sessionStorage.clear();
    axios({
      method: "GET",
      url: "https://guarded-dusk-22777.herokuapp.com/locations",
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          locations: response.data.Locations,
        });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "https://guarded-dusk-22777.herokuapp.com/mealtypes",
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          mealtypes: response.data.MealTypes,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { locations, mealtypes } = this.state;
    return (
      <div>
        <Wallpaper locations={locations} />
        <br />
        <QuickSearch mealtypes={mealtypes} key={mealtypes.__id} />
      </div>
    );
  }
}

export default Home;
