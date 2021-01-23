import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/index.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: "descend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "name", width: "10%", order: "descend" },
      { name: "phone", width: "20%", order: "descend" },
      { name: "email", width: "20%", order: "descend" },
      { name: "dob", width: "10%", order: "descend" }
    ]
  });

  //handles the sorting of results
  const handleSort = heading => {
    let currentOrder = developerState.headings
    //filters the results by the 'name' heading. 
      .filter(elem => elem.name === heading)
      //then, it maps the results and returns them in descending order, in string form.
      .map(elem => elem.order)
      .toString();
//if the current order is set to 'descend'
    if (currentOrder === "descend") {
      //switch the order to ascend when selected.
      currentOrder = "ascend";
      //otherwise, let the order remain set to 'descend'. 
    } else {
      currentOrder = "descend";
    }

    //compares the order of each item in the list to other items to compare
    //to eventually end up in the correct order when sorting. 
    const compareFnc = (a, b) => {
      //if the order is set to 'ascend'
      if (currentOrder === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        //else if sorting via ascending 'name' heading,
        else if (heading === "name") {
          //compare the first names of 2 items for ordering and return applicable items. 
          return a[heading].first.localeCompare(b[heading].first);
          //else sort via ascending 'date of birth' heading
        } else if (heading === "dob") {
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        //else if sorting via descending 'name' heading,
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        }else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        }  else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    //updating the headings data with pulled elements. 
    const updatedHeadings = developerState.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings
    });
  };
//searching via name in search bar
  const handleSearchName = event => {
    const filter = event.target.value;
    //generate list
    const filteredList = developerState.users.filter(item => {
      //filter via first and last name via input value
      let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
      console.log(filter, values)
      //if there are matching results, return the item. 
    if(values.indexOf(filter.toLowerCase()) !== -1){
      return item
    };
    });
//set the state as 'filtered' after performing the above filtering
    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  };

 //pull in API data to populate heading names. 
  useEffect(() => {
    API.getUsers().then(results => {
      console.log(results.data.results);
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  return (
    //returns the state, returned search and sorting function.
    <DataAreaContext.Provider
      value={{ developerState, handleSearchName, handleSort }}
    >
      <Nav />
      {/* as long as there are results, filter and return them. */}
      <div className="data-area">        
        {developerState.filteredUsers.length > 0 ? <DataTable /> : <div></div>}
      </div>
    </DataAreaContext.Provider>
  );
};

export default DataArea;
