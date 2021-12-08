import { Avatar, Button, makeStyles } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const useStyles = makeStyles((theme) => ({
  form_cmt: {
    backgroundColor: "#e0e0e0",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "#eceff1",
    },
    width: "90%",
    marginLeft: "1rem",
  },
  input_cmt: {
    backgroundColor: "transparent",
    width: "89%",
    padding: "5px",
    borderRadius: "16px",
    display: "flex",
  },
  inputContainer: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "flex-start",
  },
  button_cmt: {
    borderRadius: "16px",
    backgroundColor: "#757575",

    color: "white",
    fontWeight: "600",
    "&:hover": { backgroundColor: "#212121" },
  },
}));
export default function InputCmt() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={classes.inputContainer}>
      <Avatar
        alt=""
        src={
          user.profilePicture
            ? user.profilePicture
            : PF + "person/noAvartar.jpg"
        }
        className={classes.image}
      />

      <form className={classes.form_cmt}>
        <input
          type="text"
          placeholder="bình luận..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={classes.input_cmt}
        />
        <Button type="submit" className={classes.button_cmt}>
          Đăng
        </Button>
      </form>
    </div>
  );
}
