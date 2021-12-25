import React, {useState, useEffect, useContext} from "react";
import {useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AddNotification() {
    const [errAlert, setErrAlert] = React.useState(false);
    const { token, user } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || title.length === 0 || !content || content.length === 0 || !categoryId || categoryId.length === 0 ) {
            setErrorMsg("Vui lòng nhập đầy đủ thông tin");
            setErrAlert(true)  
        }
        else{
            const notification = {
                title: title,
                content: content, 
                categoryId: categoryId
            }
            console.log(notification)
            let res = await axios.post(`/falcuty/notifications`, notification,
            {
            headers: { "Authorization": "Bearer " + token },
            });
            if (res.data.code == 1){
                setSuccess(true);
                setTimeout(() => {
                    navigate("/falcuty");
                }, 2000)
            }
            else{
                setErrAlert(true);
                setErrorMsg(res.data.message);
            }      
        } 
    }
    const fectchCategories = async () => {
        try{
            let res = await axios.get(`/falcuty/categories`,
            {
              headers: { "Authorization": "Bearer " + token },
            });
            setCategories(res.data);
        }catch(error){

        }  
    }
    useEffect(() => {      
        fectchCategories();
    },[])


    const formControl = {
        width: '100%',
        marginBottom: '20px'
    }
    return (
        <>
            <div className="container">
                <h2 className="text-center">Thêm thông báo</h2>
                {errAlert ? <Alert style={formControl} severity="error" in={alert}>{errorMsg}</Alert> : <></>}
               
                    <form onSubmit={handleSubmit}>
                        <FormControl style={formControl}>
                            <InputLabel id="lb-category">Chuyên mục</InputLabel>
                            <Select
                            labelId="lb-category"
                            id="demo-simple-select"
                            value={categoryId}
                            input={<OutlinedInput label="Name" />}
                            label="Chuyên mục"
                            onChange={e => setCategoryId(e.target.value)}
                            >
                            {categories.map((e) => (
                                <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl style={formControl}>
                            <TextField id="filled-basic" label="Tiêu đề" onChange={e => setTitle(e.target.value)} variant="filled" />
                        </FormControl>
                        <FormControl style={formControl}>
                            <label className="form-label">Nội dung</label>
                            <div>
                            <CKEditor
                                editor={ ClassicEditor }
                                data=""
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setContent(data);
                                } }
                            />
                            </div>
                        </FormControl>
                        <div className="text-center">
                            <button type="submit" className=" text-center btn btn-success">Thêm</button>
                        </div>
                    </form>
            </div>
                <Dialog
                    open={success}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="text-center" style={{color: "green"}}>
                            <DoneIcon fontSize="large"/>
                        </div>
                        Thành công
                    </DialogContentText>
                    </DialogContent>
                </Dialog>
        </>
    );
}

