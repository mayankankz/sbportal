import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Loader from "../loader/Loader";

const DataGridTable = ({ data,actionColumn }) => {

  const columns = data.length > 0 ? Object.keys(data[0]).filter((key) => data[0][key] !== null && data[0][key] !== '').map((key) => ({ field: key, headerName: key })) : [];


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    !data ? <Loader /> : <div style={{ height: 500, width: "80vw" }}>
      <DataGrid
        columns={actionColumn ? columns.concat(actionColumn): columns}
        rows={data}
        rowSelection= {false}
        slots={{
          toolbar: CustomToolbar,
        }} />
    </div>
  );
};

export default DataGridTable;
