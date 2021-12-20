
import React, {useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import moment from 'moment';
import 'moment/locale/vi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import EditNotificationDialog from "./EditNotificationForm"
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NotificationTable(){
    moment.locale('vi'); 
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertType, setAlertType] = useState("");
    const [notifications, setNotifications] = useState([]);
    const { token, user } = useContext(AuthContext);
    const [notificationId, setNotificationId] = useState('');

    const [notification, setNotification] = useState({});
    const [search, setSearch] = useState('');
    //Mở dialog form chỉnh sửa thông báo
    const [openEdit, setOpenEdit] = React.useState(false);


    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    
    
    //Mở dialog xóa thông báo
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
  
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };


    //Xử lí xóa thông báo
    const handleDeleteNotification = async () => {
        
        try 
        {
            const res = await axios.delete(
                `falcuty/notifications/${notificationId}`,
                {
                  headers: { "Authorization": "Bearer " + token },
                },
              );
            handleCloseDelete();
            let refreshNotifications = await notifications.filter(not => not._id !== notificationId);
            setNotifications(refreshNotifications);
            setAlert(true);
            setAlertContent(res.data);
            setAlertType("success");
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log("Request cancel", err.message);
            }
        }
    }

    const fetchNotifications = async () => {
        try 
        {
            const res = await axios.get(
                `falcuty/notifications`,
                {
                  headers: { "Authorization": "Bearer " + token },
                },
              );
              console.log(res.data);
            setNotifications(res.data);
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log("Request cancel", err.message);
            }
        }
    }
    useEffect(() => {
        fetchNotifications();
    },[]);

    useEffect(() => {
        let searchedNotifications = notifications.filter(noti => noti.title.includes(search))
        setNotifications(searchedNotifications)
    }, [search])
    return(
        <>
        
        <div className="container">
        <TextField
          id="filled-number"
          label="Tìm kiếm"
          type="text"
          placeholder="Tìm kiếm..."
          onChange={e => setSearch(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        {alert ? <Alert className="mt-1 mb-1" severity={alertType} in={alert}>{alertContent}</Alert> : <></>}
        <table className = "table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Chuyên mục</th>
                        <th>Ngày đăng</th>
                        <th></th>
                    </tr>     
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{notification.title}</td>
                        <td>{notification.category[0].name}</td>
                        <td>{moment(notification.createdAt).format('lll')}</td>
                        <td>
                            <button>
                                <EditIcon onClick={() => {
                                    handleClickOpenEdit();
                                    setNotification(notification);
                                }}
                                />
                                <DeleteIcon onClick={() => {
                                    handleClickOpenDelete();
                                    setNotificationId(notification._id);
                                }}/>
                            </button>
                        </td>
                    </tr>
                    ))}        
                </tbody>                          
            </table>
        </div>  
        <Dialog
            open={openDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDelete}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>Xóa thông báo</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Bạn có chắc muốn xóa thông báo này không ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <button className="btn btn-secondary" onClick={handleCloseDelete}>Hủy</button>
            <button className="btn btn-danger" onClick={handleDeleteNotification}>Xác nhận</button>
            </DialogActions>
        </Dialog> 
        <EditNotificationDialog 
            openEdit={openEdit} 
            handleCloseEdit={handleCloseEdit}
            Transition={Transition}
            notification = {notification}
            token = {token}
            setAlert = {setAlert}
            setAlertContent = {setAlertContent}
            setAlertType = {setAlertType}
        >
        </EditNotificationDialog>                        
        </>
    );
}