import React, { useEffect, useState } from "react";

import { Grid, makeStyles } from "@material-ui/core";

import Leftbar from "../components/Leftbar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
<<<<<<< HEAD

=======
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
>>>>>>> 4d804319a2000c33df950cbb3b27af22e0167f4e

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  contentpad: {
    paddingTop: theme.spacing(10),
  },
}));
<<<<<<< HEAD
export default function Home() {
=======
export default function Home({ socket }) {
>>>>>>> 4d804319a2000c33df950cbb3b27af22e0167f4e
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

<<<<<<< HEAD
  
  
=======
  useEffect(() => {
    if (socket) {
      socket.on("newNotification", (msg) => {
        setMessage(msg);
        console.log(msg);
        setOpen(true);
      });
    }
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
>>>>>>> 4d804319a2000c33df950cbb3b27af22e0167f4e
  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item md={2} className={classes.right}>
          <Leftbar />
        </Grid>
        <Grid item sm={12} md={7} xs={12} className={classes.contentpad}>
          <Feed />
        </Grid>
        <Grid item md={3} className={classes.right}>
          <Rightbar />
        </Grid>
      </Grid>
<<<<<<< HEAD
      
=======
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <a href={message.url}>
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message.cateName} vừa đăng thông báo "{message.title}"
          </Alert>
        </a>
      </Snackbar>
      {message ? (
        <a href={message.url}>
          <Alert severity="success">
            {message.cateName} vừa đăng thông báo "{message.title}"
          </Alert>
        </a>
      ) : (
        <></>
      )}
>>>>>>> 4d804319a2000c33df950cbb3b27af22e0167f4e
    </>
  );
}
