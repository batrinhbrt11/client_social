import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileCover: {
    height: "400px",
    position: "relative",
  },

  profileCoverImg: {
    width: " 100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "0 0 10px 10px",
  },

  profileUserImg: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: "0",
    right: "0",
    margin: "auto",
    top: "250px",
    border: "3px solid white",
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfoName: {
    fontSize: "2rem",
  },
}));
export default function ProfileImage({ user }) {
  const classes = useStyles();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={classes.container}>
      <div className={classes.profileCover}>
        <img
          className={classes.profileCoverImg}
          src={
            user.coverPicture ? PF + user.coverPicture : PF + "person/cover.png"
          }
          alt=""
        />
        <img
          className={classes.profileUserImg}
          alt=""
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvartar.jpg"
          }
        />
      </div>
      <div className={classes.profileInfo}>
        <h4 className={classes.profileInfoName}>{user.username}</h4>
      </div>
    </div>
  );
}
