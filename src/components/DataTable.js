import React, { useContext } from "react";
import DataBody from "./DataBody";
import "../styles/index.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataTable = () => {
  const context = useContext(DataAreaContext);

  return (

    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {/* returns the mapped columns (mapped to heading names) with a sort button */}
            {context.developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    context.handleSort(name);
                  }}
                >
                  {/* pulls in the heading name and assigns it a sorting icon. */}
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>

        <DataBody />
      </table>
    </div>
  );
}

export default DataTable;