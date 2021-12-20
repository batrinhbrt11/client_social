import React, { useContext, useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@mui/material/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import "../css/ProfileRight.css";
import CloseIcon from "@mui/icons-material/Close";
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MangeUser() {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [editRow, setEditRow] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const editName = useRef();
  const addName = useRef();
  const addEmail = useRef();
  const addUserName = useRef();
  const addPassword = useRef();
  const addAuth = useRef();

  const [value, setValue] = useState([
    { id: "10", text: "One" },
    { id: "20", text: "Two" },
  ]);

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
    { field: "id", headerName: "ID", width: 100, flex: 1 },

    {
      field: "name",
      headerName: "Tên người dùng",
      sortable: false,
      width: 300,
      flex: 1,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      sortable: false,
      width: 300,
      flex: 1,
    },
    {
      field: "authorize",
      headerName: "Chức năng",

      sortable: false,
      width: 300,
      flex: 1,
    },
    {
      field: "faculty",
      headerName: "Khoa",
      sortable: false,
      width: 300,
      flex: 1,
    },
  ];
  const handleEditRow = async (e) => {
    e.preventDefault();
    const newUser = {
      name: editName.current.value,
      value: value,
    };
    //call api here
    await axios.put(`/users/${editRow.id}`, newUser, {
      headers: { "x-access-token": token },
    });
    //
    editRow.name = editName.current.value;
    handleClose();
  };

  const handleDeleteRow = async (e) => {
    e.preventDefault();

    const selectedIDs = new Set(selectionModel);
    //call api here

    var config = {
      method: "delete",
      url: "/users",
      headers: {
        "x-access-token": token,
      },
      data: {
        ids: Array.from(selectedIDs),
      },
    };

    await axios(config)
      .then(function (res) {
        setRows(res.data);
        handleClose();
        setSuccess("Xóa người dùng thành công");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const handleAddRow = async (e) => {
    e.preventDefault();

    //call api
    try {
      if (addName.current.value === "") {
        setError("Điền tên người dùng");
      } else if (addEmail.current.value === "") {
        setError("Không đươc để trống email ");
      } else if (!filter.test(addEmail.current.value)) {
        setError("Email không hợp lệ");
      } else if (addUserName.current.value === "") {
        setError("Không đươc để trống tên tài khoản ");
      } else if (addPassword.current.value.length < 6) {
        setError("Độ dài mật khẩu phải lớn hơn 6 ");
      } else {
        const newUser = {
          name: addName.current.value,
          username: addUserName.current.value,
          email: addEmail.current.value,
          password: addPassword.current.value,
          authorize: addAuth.current.value,
        };
        await axios.post("/users", newUser, {
          headers: { "x-access-token": token },
        });
        //
        const res = await axios.get("/users", {
          headers: { "x-access-token": token },
        });
        setRows(res.data);
        handleClose();
        setSuccess("Thêm người dùng thành công");
      }
    } catch (err) {
      setError("Tài khoản đã tồn tại");
    }
  };

  //call api
  useEffect(() => {
    const ourRequest = axios.CancelToken.source(); //1st step
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "/users",
          {
            headers: { "x-access-token": token },
          },
          {
            cancelToken: ourRequest.token,
          }
        );
        const data = res.data;
        setRows(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Requet cancel", err.message);
        }

        if (err.response.status === 401) {
          localStorage.removeItem("user");

          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    };

    fetchData();

    return () => {
      ourRequest.cancel("cancel by user"); //3rd step
    };
  }, []);

  //end call api

  //format data from api
  const rowData = rows.map((d) => {
    let author = "";
    if (d.authorize === 3) {
      author = "Sinh viên";
    } else if (d.authorize === 2) {
      author = "Quản lí";
    } else if (d.authorize === 1) {
      author = "Quản trị";
    }
    return {
      id: d._id,
      name: d.name,
      username: d.username,
      authorize: author,
    };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      {success && (
        <div className="successNotification">
          <span>{success}</span>
          <IconButton
            color="success"
            aria-label="upload picture"
            component="span"
            onClick={(e) => setSuccess("")}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}

      <div>
        <Button
          startIcon={<AddIcon />}
          className={classes.add_btn}
          onClick={(e) => handleClickOpen("Add")}
        >
          Thêm người dùng
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          className={classes.delete_btn}
          onClick={(e) => handleClickOpen("Delete")}
        >
          Xóa người dùng
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
              const result = rowData.find(({ id }) => id === selectedIDs[0]);
              setEditRow(result);

              handleClickOpen("Edit");
            }
          }}
        >
          Sửa người dùng
        </Button>
      </div>

      <DataGrid
        rows={rowData}
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
        //sua nguoi dung
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sửa người dùng</DialogTitle>
          <DialogContent>
            <form className="form_update_info">
              <div className="form_update_info-item">
                <label htmlFor="fname" className="form_update_info-label">
                  Tên người dùng
                </label>
                <input
                  aria-label=""
                  className="form_update_info-input"
                  type="text"
                  ref={editName}
                  defaultValue={editRow.name}
                />
              </div>
              <div>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  value={value}
                  options={[
                    { id: "10", text: "One" },
                    { id: "20", text: "Two" },
                    { id: "30", text: "Three" },
                  ]}
                  getOptionLabel={(option) => option.text}
                  getOptionSelected={(option, value) => value.id === option.id}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Danh muc"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.text}
                    </React.Fragment>
                  )}
                  onChange={(_, selectedOptions) => setValue(selectedOptions)}
                />
              </div>
            </form>
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
      ) : //end sua nguoi dung
      choice === "Delete" ? (
        //delete
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Xóa người dùng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Không thể khôi phục, xác nhận xóa các người dùng này?
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
        //end delete
        //add
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm người dùng</DialogTitle>

          <DialogContent>
            {error && <span className="error">{error}</span>}
            <form className="form_update_info">
              <div className="form_update_info-item">
                <label htmlFor="fname" className="form_update_info-label">
                  Tên người dùng:
                </label>
                <input
                  aria-label=""
                  className="form_update_info-input"
                  type="text"
                  ref={addName}
                  required
                  onClick={(e) => setError("")}
                />
              </div>
              <div className="form_update_info-item">
                <label htmlFor="fname" className="form_update_info-label">
                  Email:
                </label>
                <input
                  aria-label=""
                  className="form_update_info-input"
                  type="email"
                  ref={addEmail}
                  required
                  onClick={(e) => setError("")}
                />
              </div>
              <div className="form_update_info-item">
                <label htmlFor="fname" className="form_update_info-label">
                  Tên tài khoản:
                </label>
                <input
                  aria-label=""
                  className="form_update_info-input"
                  type="text"
                  ref={addUserName}
                  required
                  onClick={(e) => setError("")}
                />
              </div>
              <div className="form_update_info-item">
                <label htmlFor="fname" className="form_update_info-label">
                  Mật khẩu:
                </label>
                <input
                  aria-label=""
                  className="form_update_info-input"
                  type="password"
                  ref={addPassword}
                  minLength="6"
                  required
                  onClick={(e) => setError("")}
                />
              </div>
              <div className="form_update_info-item">
                <label htmlFor="faculty" className="form_update_info-label">
                  Phân quyền:
                </label>
                <select className="form_update_info-selection" ref={addAuth}>
                  <option value="2">Quản lí</option>
                  <option value="1">Quản trị</option>
                </select>
              </div>
            </form>
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

        ///end add
      )}
    </div>
  );
}
