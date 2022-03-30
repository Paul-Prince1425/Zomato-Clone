import React, { Component } from "react";
import "../Styles/Filter.css";
import { withRouter } from "react-router-dom";

export class FilterHeader extends Component {
  handleClick = () => {
    this.props.history.push(`/`);
  };
  render() {
    const { totalPage, totalRestaurants } = this.props;
    return (
      <div>
        {/* <div className="navbar bg">
          <div className="container">
            <div className="icon" onClick={this.handleClick}>
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
        </div> */}
        <br />
        <div className="container">
          <div className="heading">
            <h1>Breakfast Places in Chennai</h1>
            {totalRestaurants !== 0 && (
              <span>
                {totalPage === 1
                  ? `${totalPage} page, `
                  : `${totalPage} pages, `}
                {totalRestaurants === 1
                  ? `${totalRestaurants} restaurant`
                  : `${totalRestaurants} restaurants`}
              </span>
            )}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(FilterHeader);
