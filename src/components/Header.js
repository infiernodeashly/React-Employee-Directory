import React from 'react';
import "../styles/index.css";

function Header () {
    return (
      <div className="header">
        <h1>Employee Directory</h1>
        <p>Click on carrots to filter. You can also use the search box to filter your results by first and last name.</p>
      </div>
    )
  }

export default Header;