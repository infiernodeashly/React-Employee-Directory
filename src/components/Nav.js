import React from "react";
import SearchName from "./SearchName.js";
// import SearchDOB from "./SearchDOB.js";
import "../styles/index.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* creating search via name button */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse row" id="navbarNav">
        <div className="search-area col-4">
          {/* pull in search via name box and function */}
          <SearchName />
        </div>
      </div>
    </nav>
  );
}
export default Nav;