import React from "react";
import NotificationTable from "../components/NotificationTable";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Falcuty(){
    return(
        <>
        <div className="container">
            <Link to="/falcuty/notification/add" className="btn btn-success mb-3 mt-3">Tạo thông báo</Link>
            <NotificationTable/>
        </div>   
        </>
    );
}
