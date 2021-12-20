import React, { useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@mui/material/";
const useStyles = makeStyles((theme) => ({
  dataTable: {
    marginTop: "30px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  btn_cancel: {
    color: "red !important",
  },
  btn_edit: {
    color: "#03a9f4",
  },
  add_btn: {
    border: "1px solid #212121!important",
    color: "black !important",
    margin: "10px !important",
    "&:hover": {
      backgroundColor: "#212121!important",
      color: "white !important",
    },
  },
  edit_btn: {
    border: "1px solid #2196f3!important",
    color: "#2196f3!important",
    margin: "10px !important",
    "&:hover": {
      backgroundColor: "#2196f3!important",
      color: "white !important",
    },
  },
  delete_btn: {
    border: "1px solid red !important",
    color: "red !important",
    margin: "10px !important",
    "&:hover": {
      backgroundColor: "red!important",
      color: "white !important",
    },
  },
}));
const data = [
  { id: 1, name: "Jon" },
  { id: 2, name: "Cersei" },
  { id: 3, name: "Jaime" },
  { id: 4, name: "Arya" },
  { id: 5, name: "Daenerys" },
  { id: 6, name: null },
  { id: 7, name: "Ferrara" },
  { id: 8, name: "Rossini" },
  { id: 9, name: "Harvey" },
];
export default function ManageCate() {
  const classes = useStyles();
  const [rows, setRows] = useState(data);
  const [selectionModel, setSelectionModel] = useState([]);
  const [editRow, setEditRow] = useState({});
  const editName = useRef();
  const addName = useRef();
  //edit dialog
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  const handleClickOpen = (string) => {
    setOpen(true);
    setChoice(string);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //end edit dialog
  //end edit dialog
  const columns = [
    { field: "id", headerName: "ID", width: 100, flex: 0.3 },

    {
      field: "name",
      headerName: "Tên danh mục",
      sortable: false,
      width: 300,
      flex: 1,
    },
  ];
  const handleEditRow = (e) => {
    e.preventDefault();
    //call api here

    //
    editRow.name = editName.current.value;
    handleClose();
  };

  const handleDeleteRow = (e) => {
    e.preventDefault();
    const selectedIDs = new Set(selectionModel);
    //call api here

    //

    setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
    handleClose();
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    //call api
    //
    const obj = { id: 2, name: addName.current.value };
    const newData = [...rows, obj];
    setRows(newData);
    console.log(newData);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <div>
        <Button
          startIcon={<AddIcon />}
          className={classes.add_btn}
          onClick={(e) => handleClickOpen("Add")}
        >
          Thêm danh mục
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          className={classes.delete_btn}
          onClick={(e) => handleClickOpen("Delete")}
        >
          Xóa Danh mục
        </Button>
        <Button
          startIcon={<EditIcon />}
          className={classes.edit_btn}
          onClick={() => {
            const selectedIDs = selectionModel;
            // you can call an API to delete the selected IDs
            // and get the latest results after the deletion
            // then call setRows() to update the data locally here
            if (selectionModel.length !== 1) {
              window.alert("Vui lòng chọn 1 hàng");
            } else {
              const result = rows.find(({ id }) => id === selectedIDs[0]);
              setEditRow(result);
              handleClickOpen("Edit");
            }
          }}
        >
          Sửa danh mục
        </Button>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        className={classes.dataTable}
      />
      {choice === "Edit" ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sửa danh mục</DialogTitle>
          <DialogContent>
            <label htmlFor="fname" className="form_update_info-label">
              Tên danh mục
            </label>
            <input
              aria-label=""
              className="form_update_info-input"
              type="text"
              ref={editName}
              defaultValue={editRow.name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.btn_cancel}>
              Hủy
            </Button>
            <Button onClick={handleEditRow} className={classes.btn_edit}>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      ) : choice === "Delete" ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Xóa danh mục</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Không thể khôi phục, xác nhận xóa các danh mục này?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} className={classes.btn_cancel}>
              Hủy
            </Button>
            <Button onClick={handleDeleteRow} className={classes.btn_edit}>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm danh mục</DialogTitle>

          <DialogContent>
            <label htmlFor="fname" className="form_update_info-label">
              Tên danh mục
            </label>
            <input
              aria-label=""
              className="form_update_info-input"
              type="text"
              ref={addName}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} className={classes.btn_cancel}>
              Hủy
            </Button>
            <Button onClick={handleAddRow} className={classes.btn_edit}>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
