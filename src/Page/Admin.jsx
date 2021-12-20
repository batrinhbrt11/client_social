import React, {useEffect, useContext, useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { makeStyles, Grid, Container } from "@material-ui/core";
import FalcutyTable from "../components/NotificationTable";
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AddFalcuty from "../components/AddFalcuty"
import { AuthContext } from "../Context/AuthContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Admin(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { token, user } = useContext(AuthContext);
    
    return(
    <>
        <Container>
            <Button variant="contained" color="success" onClick={handleOpen}>Thêm phòng/khoa</Button>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={open}>
                <Box sx={style}>
                    <AddFalcuty/>
                </Box>
                </Fade>
            </Modal>
            <FalcutyTable/>
        </Container>
    </>
    );
}
export default Admin