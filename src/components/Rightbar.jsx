import React from "react";
import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import "../css/Rightbar.css";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    top: "0",
    height: "100vh",
    position: "sticky",
  },

  rightBarFriendInfo: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
  },
  image: {
    marginRight: theme.spacing(1),
  },
  rightBarWrapper: {
    paddingLeft: theme.spacing(11),
  },

  rightbarList: {
    padding: "0",
    margin: "0",
    position: "sticky",
    height: "50vh",
    top: "0",
    overflowY: "scroll",
    listStyle: "none",
  },
  rightBarNoti: {
    "&:nth-child(odd)": {
      borderLeft: "10px solid #99dfff",
      backgroundColor: "#e1f5fe",
    },
    "&:nth-child(even)": {
      borderLeft: "10px solid #9e9e9e",
      backgroundColor: "#eeeeee",
    },
  },
  textTitle: {
    textOverflow: " ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: "600",
  },
}));

export default function Rightbar() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.rightBarWrapper}>
        <Typography variant="h6">Thông báo</Typography>
        <ul className={classes.rightbarList}>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
          <li className={classes.rightBarNoti}>
            <div className={classes.rightBarNotiInfo}>
              <Typography variant="body1" className={classes.textTitle}>
                Bạn bè sdsd sadsd sdsad
              </Typography>
              <Typography variant="body1" className="textContent">
                Bạn bè Bạn bè sdsd sadsd sdsad Bạn bè sdsd sadsd sdsadBạn bè
                sdsd sadsd sdsad
              </Typography>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}
