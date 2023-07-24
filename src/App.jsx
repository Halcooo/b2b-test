import "./App.css";
import "devextreme/dist/css/dx.light.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

import DataGrid, {
  SearchPanel,
  ColumnChooser, ColumnFixing,
  Column
} from "devextreme-react/data-grid";

function App() {
  const URL = "http://77.78.198.63:252/";
  const [data, setData] = useState("");
  const [columns, setColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  useEffect(() => {
    getColumns();
    getData();
  }, []);

  useEffect(() => {
    setHiddenColumns(columns.filter(x => !visibleColumns.includes(x)));
  }, [visibleColumns, columns])


  const getColumns = async () => {
    await axios
      .get(URL + "kolone")
      .then((response) => {
        setColumns(response.data);
        setVisibleColumns(response.data.slice(0, 5));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getData = async () => {
    await axios
      .get(URL + "sifre")
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleVisibleColumns = (column) => {
    let currentVisible = visibleColumns.filter((x) => x !== column);
    let currentHidden = hiddenColumns;
    currentHidden.push(column);
    setHiddenColumns(currentHidden);
    setVisibleColumns(currentVisible);
  }
  const handleHiddenColumns = (column) => {
    let currentHidden = hiddenColumns.filter((x) => x !== column);
    let currentVisible = visibleColumns;
    currentVisible.push(column)
    setVisibleColumns(currentVisible);
    setHiddenColumns(currentHidden)
  }
  const configureSearchBar = (e) => {
    if (e.parentType === "searchPanel") {
      e.editorOptions.onValueChanged = (arg) => {
        if (arg.value.length === 0 || arg.value.length >= 3) {
          e.component.searchByText(arg.value);
        } else {
          e.component.clearFilter("search") //TODO bug imam!!!!!
        }
      }
      e.updateValueTimeout = 1000;
    }
  }
  return (
    <div className="wrapper">
      <DataGrid
        id="gridContainer"
        dataSource={data}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showBorders={true}
        onEditorPreparing={(e) => {configureSearchBar(e) }}
      >
        {visibleColumns.map((column, i) => {
        return (<Column key={i} dataField={column}></Column>)
      })
        }
        <ColumnChooser enabled={true} mode="select" />
        <ColumnFixing enabled={true} />
        <SearchPanel
          visible={true}
          searchVisibleColumnsOnly={true}
        />
      </DataGrid>
      <div className="side-nav">
        <div className="hidden">
          <h4>Hidden columns</h4>
          {hiddenColumns.map((column, i) => {
            return <div className="red" key={i} onDoubleClick={() => {
              handleHiddenColumns(column)
            }}>{column}</div>;
          })}
        </div>
        <div className="visible">
          <h4>Visible columns</h4>
          {visibleColumns.map((column, i) => {
            return <div className="green" key={i} onDoubleClick={() => {
              handleVisibleColumns(column)
            }}>{column}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
