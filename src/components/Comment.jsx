import {
  Avatar,
  Button,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const useStyles = makeStyles((theme) => ({
  cmt_container: {
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "flex-start",
  },
  cmt_text: {
    padding: " 5px 10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "16px",
    marginLeft: "1rem",
  },
  cmt_textName: {
    fontSize: "0.8rem",
  },
  icon_button: {
    borderRadius: "50%",
    padding: "5px !important",
  },
  readMore: {
    fontWeight: "600",
    cursor: "pointer",
  },
  form_cmt: {
    backgroundColor: "#e0e0e0",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "#eceff1",
    },
    width: "80%",
    marginLeft: "1rem",
  },

  button_cmt: {
    borderRadius: "16px",
    backgroundColor: "#757575",

    color: "white",
    fontWeight: "600",
    "&:hover": { backgroundColor: "#212121" },
  },
  textArea: {
    width: "100%",
    backgroundColor: "transparent",
    padding: "5px",
  },
}));

export default function Comment() {
  const classes = useStyles();

  const [readMore, setReadMore] = useState(false);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [anchorEl, setAnchorEl] = useState(null);
  const open_menu = Boolean(anchorEl);
  const [onEdit, setOnEdit] = useState(false);
  const [content, setContent] = useState(
    "fcsfsdsdwwdwqdwqLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Edit_cmt = (e) => {
    setOnEdit(true);

    setAnchorEl(null);
  };

  return (
    <div className={classes.cmt_container}>
      <Link to="/">
        <Avatar
          alt=""
          src={
            user.profilePicture
              ? user.profilePicture
              : PF + "person/noAvartar.jpg"
          }
          className={classes.image}
        />
      </Link>
      {onEdit ? (
        <form className={classes.form_cmt}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            defaultValue={content}
            className={classes.textArea}
          />
          <button type="submit" className={classes.button_cmt}>
            Đăng
          </button>
        </form>
      ) : (
        <div className={classes.cmt_text}>
          <h6 className={classes.cmt_textName}>Bá Trình</h6>
          <span className={classes.cmt_textContent}>
            {content.length < 100
              ? content
              : readMore
              ? content + " "
              : content.slice(0, 100) + "...."}
          </span>
          {content.length > 100 && (
            <span
              className={classes.readMore}
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "Hide content" : "Read more"}
            </span>
          )}
        </div>
      )}

      <div>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open_menu ? "true" : undefined}
          onClick={handleClick}
          className={classes.icon_button}
        >
          <MoreHorizIcon className={classes.icon} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open_menu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          className={classes.subMenu}
        >
          <MenuItem>Xóa bình luận</MenuItem>
          <MenuItem onClick={(e) => Edit_cmt(e)}>Sửa bình luận</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
