import React, { useContext, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  share: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    "-webkit-box-shadow": "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: " 0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
  },
  shareWrapper: {
    padding: "10px",
  },
  shareTop: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    marginRight: "10px",
  },
  shareInput: {
    border: "none",
    width: "80%",
    "&:focus": {
      outLine: "none",
    },
  },
  divider: {
    margin: "1.25rem",
  },
  shareBottom: {
    display: " flex",
    alignItems: "center",
    justifyContent: " space-between",
  },
  shareOptions: {
    display: "flex",

    marginLeft: "1.25rem",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  shareOption: {
    display: "flex",
    alignItems: "center",
    marginRight: "1rem",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  shareIcon: {
    fontSize: "1rem",
    marginRight: "3px",
  },
  shareOptionText: {
    fontSize: "14px",
    fontWeight: "700",
  },
  shareButton: {
    border: "none",
    padding: "7px",
    borderRadius: "5px",
    backgroundColor: "green",
    fontWeight: "500",
    marginRight: "20px",
    cursor: "pointer",
    color: " white",
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
  shareImgContainer: {
    padding: "0 20px 10px 20px",
    position: "relative",
  },

  shareImg: {
    width: "100%",
    objectFit: "cover",
  },

  shareCancelImg: {
    position: "absolute",
    top: "0",
    right: "20px",
    cursor: "pointer",
    opacity: "0.7",
    color: "red",
  },
}));

export default function Share() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className={classes.share}>
      <div className={classes.shareWrapper}>
        <div className={classes.shareTop}>
          <Avatar
            alt=""
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvartar.jpg"
            }
            className={classes.image}
          />
          <input
            placeholder={"What's new, " + user.username + "?"}
            className={classes.shareInput}
            ref={desc}
          />
        </div>
        <Divider className={classes.divider} />
        {file && (
          <div className={classes.shareImgContainer}>
            <img
              className={classes.shareImg}
              src={URL.createObjectURL(file)}
              alt=""
            />
            <CloseIcon
              className={classes.shareCancelImg}
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className={classes.shareBottom} onSubmit={submitHandler}>
          <div className={classes.shareOptions}>
            <div className={classes.shareOption}>
              <VideoLibraryIcon
                htmlColor="tomato"
                className={classes.shareIcon}
              />
              <Typography variant="body1" className={classes.shareOptionText}>
                Video
              </Typography>
            </div>
            <label htmlFor="file_img" className={classes.shareOption}>
              <PermMediaIcon htmlColor="green" className={classes.shareIcon} />
              <Typography variant="body1" className={classes.shareOptionText}>
                Image
              </Typography>
              <input
                type="file"
                id="file_img"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className={classes.shareOption}>
              <EmojiEmotionsIcon
                htmlColor="goldenrod"
                className={classes.shareIcon}
              />
              <Typography variant="body1" className={classes.shareOptionText}>
                Feelings
              </Typography>
            </div>
          </div>
          <Button type="submit" className={classes.shareButton}>
            Share
          </Button>
        </form>
      </div>
    </Container>
  );
}
