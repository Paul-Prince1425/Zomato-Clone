import React, { Component } from "react";
import "../Styles/Filter.css";
import FilterContent from "./FilterContent";
import FilterHeader from "./FilterHeader";
import FilterSidebar from "./FilterSidebar";

export class Filter extends Component {
  render() {
    return (
      <div>
        <FilterHeader />
        <br />
        <div className="container">
          <div className="row">
            <FilterSidebar />

            <FilterContent />
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
