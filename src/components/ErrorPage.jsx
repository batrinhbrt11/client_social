import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  contentpad: {
    paddingTop: theme.spacing(10),
  },
  error: {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
  },
}));
export default function ErrorPage() {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <img alt="" src={PF + "/404errror.jpg"} className={classes.error} />
    </div>
  );
}
