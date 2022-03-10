import React, { Component } from "react";
import "../Styles/Filter.css";

export class FilterHeader extends Component {
  render() {
    return (
      <div>
        <div className="navbar bg">
          <div className="container">
            <div className="icon">
              <img
                src="Assets/Zomato-logo1.png"
                alt="No image found"
                height="60px"
                width="120px"
              />
            </div>
            <div className="nav-btn">
              <input className="button" type="button" value="Login" />
              <input
                className="create-account"
                type="button"
                value="Create an account"
              />
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <h1>Breakfast Places in Chennai</h1>
        </div>
      </div>
    );
  }
}

export default FilterHeader;
