import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Loader from "../loader/Loader";
import './datatable.scss'
import { Link } from "react-router-dom";

import BasicModalDialog from "../model/Model";
import { Button } from "flowbite-react";
import { AiOutlineReload } from "react-icons/ai";
import { BsHouseAdd } from "react-icons/bs";
import PopupModel from "../Popupmodel/PopuoModel";

const DataGridTable = ({ data, actionColumn,Title }) => {
const [open,setOpen] = useState(false)
  const columns = data.length > 0 ? Object.keys(data[1]).filter((key) => data[1][key] !== null && data[1][key] !== '').map((key) => ({ field: key, headerName: key.toUpperCase(),flex: 1 })) : [];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    !data ? <Loader /> : <div className="datatable" style={{height: Title?.includes('User') ? 550 : 599 }}>
    {open && <PopupModel open={open} setOpen={setOpen} />}
      {Title?.includes('School') && <div className="datatableTitle">
        {Title}
        
        <Button
        
        gradientMonochrome="info"
        outline
        color ='light'
        size="md"
        onClick={()=>{ setOpen(true)}}
      >
      <BsHouseAdd className="mr-3 h-5 w-4"/>
        <p>
          {Title}
        </p>
      </Button>
      </div>}
      <DataGrid
        columns={actionColumn?.field === 'Image' ? [actionColumn,...columns] : actionColumn ? columns.concat(actionColumn) : columns}
        rows={data}
        rowSelection={false}
        getRowId={(row) => Title?.includes('User') ? row.userid: row.id}
        slots={{
          toolbar: CustomToolbar,
        }} />
    </div>

  );
};

export default DataGridTable;
