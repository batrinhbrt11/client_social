import React, {useEffect, useState} from "react";

import { Grid, makeStyles } from "@material-ui/core";

import Leftbar from "../components/Leftbar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";


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
export default function Home() {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  
  
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
      
    </>
  );
}
