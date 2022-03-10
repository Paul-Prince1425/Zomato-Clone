import React, { Component } from "react";
import "../Styles/Filter.css";

export class FilterContent extends Component {
  render() {
    return (
      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="right-block">
          <div className="content1">
            <div className="flex">
              <div className="content-img">
                <img src="Assets/breakfast.jpg" />
              </div>
              <div className="hotel-details">
                <h3>Hotel Saravana Bhavan</h3>
                <p>Vadapalani</p>
                <small>No 19, Andavar Kovil Street, …</small>
                <div className="icons">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <div className="left-content">
                <ul>
                  <li>CUISINES:</li>
                  <li>COST FOR TWO:</li>
                </ul>
              </div>
              <div className="right-content">
                <ul>
                  <li>South Indian</li>
                  <li>₹ 500</li>
                </ul>
              </div>
              <div className="book">
                <input type="button" value="BOOK Table" />
              </div>
            </div>
          </div>
          <div className="content2">
            <div className="flex">
              <div className="content-img">
                <img src="Assets/dinner.jpg" />
              </div>
              <div className="hotel-details">
                <h3>Adyar Ananda Bhavan</h3>
                <p>Anna Nagar</p>
                <small>SHOP NO: C 42, 12th Main Rd, …</small>
                <div className="icons">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex">
              <div className="left-content">
                <ul>
                  <li>CUISINES:</li>
                  <li>COST FOR TWO:</li>
                </ul>
              </div>
              <div className="right-content">
                <ul>
                  <li>South Indian</li>
                  <li>₹ 700</li>
                </ul>
              </div>
              <div className="book">
                <input type="button" value="BOOK Table" />
              </div>
            </div>
          </div>
          <div className="Footer">
            <div className="footer-flex">
              <a href="#">
                <input type="button" value="<" />
              </a>
              <a href="#">
                <input type="button" value="1" />
              </a>
              <a href="#">
                <input type="button" value="2" />
              </a>
              <a href="#">
                <input type="button" value="3" />
              </a>
              <a href="#">
                <input type="button" value="4" />
              </a>
              <a href="#">
                <input type="button" value="5" />
              </a>
              <a href="#">
                <input type="button" value=">" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterContent;
