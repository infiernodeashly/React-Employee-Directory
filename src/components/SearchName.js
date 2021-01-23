import React, { useContext } from "react";
import "../styles/index.css";
import DataAreaContext from "../utils/DataAreaContext";

const SearchName = () => {
  const context = useContext(DataAreaContext);

  return (
    //develop searchbox by name to accompany button. 
    <div className="searchbox">
      <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Search
            </span>
          </div>
          <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="first or last name"
          aria-label="Search"
          // Tie search by name function to searchbox. 
          onChange={e => context.handleSearchName(e)}
        />
        </div>
    </div>
  );
}
export default SearchName;