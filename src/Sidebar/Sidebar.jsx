import React from 'react'
import './Sidebar.css'

function Sidebar(props) {
  return (
    <div className="side-nav">
        <div className="hidden">
          <h4>Hidden columns</h4>
          {props.hiddenColumns.map((column, i) => {
            return <div className="red" key={i} onDoubleClick={() => {
              props.handleHiddenColumns(column)
            }}>{column}</div>;
          })}
        </div>
        <div className="visible">
          <h4>Visible columns</h4>
          {props.visibleColumns.map((column, i) => {
            return <div className="green" key={i} onDoubleClick={() => {
              props.handleVisibleColumns(column)
            }}>{column}</div>;
          })}
        </div>
      </div>
  )
}

export default Sidebar