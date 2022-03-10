import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Filter from "./Filter";
import Home from "./Home";

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/filter" component={Filter} />
    </BrowserRouter>
  );
}

export default Router;
