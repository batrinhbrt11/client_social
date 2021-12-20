
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function AddFalcuty(props){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { token, user } = useContext(AuthContext);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fectchCategories = async () => {
            try{
                const res = await axios.get(
                    `/admin/categories`, 
                    {headers: { "Authorization": "Bearer " + token }
                });
                setCategories(res.data);
            }catch(error){

            } 
        }
        fectchCategories();
    },[])

    //Thêm chuyên mục 
    const AddCategories = (id) =>{
        let category = {_id: id};
        setSelectedCategories(e => [...e, category])
    }

    //Handle thêm phòng/khoa
    const handleSubmit = async (e) => {
        e.preventDefault();
        let categories = [];
        selectedCategories.map(e => (
            categories.push({_id: e._id})
        ))
        const newFalcuty = {
            name, email, username, password, categories
        }
        try{
            const res = await axios.post("/admin/falcuties", newFalcuty, {
                headers: { "Authorization": "Bearer " + token },
              });
              if(res.status == 200){
                  alert("Tạo thành công !!!");
              }
        }
        catch(error){
            alert("Vui lòng nhập đầy đủ thông tin");
        }
    }
    
    return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={props.open}>
            <Box sx={style}>
                <h3 style="text-center"><b>Sửa thông tin</b></h3>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Tên phòng/khoa</label>
                            <input type="text" value= {name} onChange={e => setName(e.target.value)} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên đăng nhập</label>
                            <input type="text" value= {username} onChange={e => setUsername(e.target.value)} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" value= {email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input type="password" value= {password} onChange={e => setPassword(e.target.value)} className="form-control"/>
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Chuyên mục</label>
                            <select className="form-select" onChange={e => AddCategories(e.target.value)} aria-label="Default select example">
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className=" text-center btn btn-success">Thêm</button>
                    </form>  
                </div>
            </Box>
        </Fade>
    </Modal>
    );
}
