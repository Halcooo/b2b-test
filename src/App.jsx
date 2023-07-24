import "./App.css";
import "devextreme/dist/css/dx.light.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataGrid, {
  SearchPanel,
  ColumnChooser,
} from "devextreme-react/data-grid";

function App() {
  const URL = "http://77.78.198.63:252/";
  const [columns, setColumns] = useState([]);

  const [searchEnabled, setSearchEnabled] = useState(false);
  useEffect(() => {
    getColumns();
  }, []);

  const getColumns = () => {
    axios
      .get(URL + "kolone")
      .then((response) => {
        setColumns(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <DataGrid
        dataSource={URL + "sifre"}
        keyExpr="id"
        showBorders={true}
        columnChooser={true}
        rowAlternationEnabled={true}
        allowColumnReordering={true}
      >
        <SearchPanel
          searchEnabled={true}
          disabled={true}
          visible={true}
          onTextChange={(value) => {
            console.log(value);
            let newcolumns = columns;
            newcolumns.push("KarakteristikaD");
            setColumns(newcolumns);
            console.log(columns);
            if (value.length > 3) {
              setSearchEnabled(true);
            }
          }}
        />
      </DataGrid>

      <div className="side-nav">
        {columns.map((column, i) => {
          return <div key={i}>{column}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
