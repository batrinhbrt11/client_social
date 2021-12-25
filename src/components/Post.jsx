import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Divider,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GradeIcon from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import InputCmt from "./InputCmt";
import Comment from "./Comment";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Carousel from "nuka-carousel";
const useStyles = makeStyles((theme) => ({
  post: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: "10px",
    "-webkit-box-shadow": "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: " 0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0 !important",
      paddingLeft: "0 !important",
    },
  },
  postWrapper: {
    padding: "10px",
  },
  postTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTopLeft: {
    display: "flex",
    alignItems: "center",
  },
  postUsername: {
    fontSize: "1rem",
    fontWeight: "500",
    margin: "0 10px",
    color: "black",
  },
  postTime: {
    fontSize: "12px",
  },
  postCenter: {
    margin: "20px 0",
  },
  postImg: {
    marginTop: "20px",
    width: "100%",
    maxHeight: "500px",
    objectFit: "fill",
  },
  postBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "1rem",
  },
  postBottomLeft: {
    display: "flex",
    alignItems: "center",
  },
  likeIcon: {
    width: "24px",
    height: "24px",
    marginRight: "5px",
    cursor: "pointer",
  },
  postLikeCounter: {
    fontSize: "1rem",
  },
  postCommentText: {
    cursor: "pointer",
    borderBottom: "1px dashed gray",
    fontSize: "15px",
  },
  likebtn: {
    cursor: "pointer",
  },
  likebtnactive: {
    cursor: "pointer",
    color: "#ffeb3b",
  },
  likeCounteractive: {
    color: "#ffeb3b",
  },
  form_cmt: {
    backgroundColor: "transparent",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",

    width: "100%",
  },
  input_cmt: {
    padding: "5px",
    backgroundColor: "transparent",
    width: "100%",
    padding: "5px",
    borderRadius: "16px",
    display: "flex",
  },

  button_cmt: {
    borderRadius: "16px",
    backgroundColor: "#757575",

    color: "white",
    fontWeight: "600",
    "&:hover": { backgroundColor: "#212121" },
  },
  subMenu: {
    padding: "5px",
  },
  deleteHeader: {
    color: "#e53935 ",
  },
  deleteContent: {
    color: "black",
  },
  deleteBtn: {
    backgroundColor: "#e53935",
    color: "white",
    "&:hover": {
      backgroundColor: "#ea605d",
    },
  },
  textArea: {
    width: "100%",
    resize: "none",
    "&:focus": {
      outLine: "none",
    },
  },
  textAreaDisable: {
    width: "100%",
    backgroundColor: "transparent",
    color: "black",
    resize: "none",
    "&:focus": {
      outLine: "none",
    },
    "&:disabled": {
      backgroundColor: "transparent !important",
      color: "black !important",
    },
  },
  menuItem: {
    display: "block",
    margin: "0 auto",
    padding: "5px",
    textAlign: "center",
  },
  iframeContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    paddingTop: "100%",
  },
  iframeItem: {
    position: " absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "100%",
    border: "none",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Post({ post, delete_post }) {
  const classes = useStyles();

  const [status, setStatus] = useState(post);
  const [like, setLike] = useState(status.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { token, user } = useContext(AuthContext);
  const [onEdit, setOnEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open_menu = Boolean(anchorEl);
  const desc = useRef();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //modal delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setAnchorEl(null);
  };
  //end modal delete

  //modal edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setAnchorEl(null);
  };
  //end modal edit

  const handleClose = () => {
    setAnchorEl(null);
  };
  const likeHandle = () => {
    try {
      axios.put(
        "/posts/" + status._id + "/like",
        { userId: user._id },
        {
          headers: { "x-access-token": token },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const [userPost, setUserPost] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(status.likes.includes(user._id));
  }, [user._id, status.likes]);

  //comments
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${post._id}`, {
        headers: { "x-access-token": token },
      });
      const data = res.data;
      setComments(data);
    } catch (err) {
      console.log("Requet cancel", err.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [post._id, comments.length]);
  //end comments

  useEffect(() => {
    const ourRequest = axios.CancelToken.source(); //1st step
    const fetchUser = async () => {
      const res = await axios.get(
        `/users/${status.userId}`,
        {
          headers: { "x-access-token": token },
        },
        {
          cancelToken: ourRequest.token, //2nd step
        }
      );
      setUserPost(res.data);
    };
    fetchUser();
    return () => {
      ourRequest.cancel("cancel by user"); //3rd step
    };
  }, [status.userId]);

  const Edit_post = (e) => {
    submitEditHandler(e);
    setAnchorEl(null);
  };

  const Delete_post = async (e) => {
    const id = await status._id;
    await delete_post(id);
  };
  const submitEditHandler = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
      await axios.put(`/posts/${status._id}`, newPost, {
        headers: { "x-access-token": token },
      });
      const res = await axios.get(`/posts/${status._id}`, {
        headers: { "x-access-token": token },
      });

      setStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.post}>
      <div className={classes.postWrapper}>
        <div className={classes.postTop}>
          <div className={classes.postTopLeft}>
            <Avatar
              alt=""
              src={
                userPost.profilePicture
                  ? userPost.profilePicture
                  : PF + "person/noAvartar.jpg"
              }
              className={classes.avatar}
            />

            <Link to={`/profile/${userPost._id}`}>
              <Typography variant="body1" className={classes.postUsername}>
                {userPost.name}
              </Typography>
            </Link>
            <Typography variant="body1" className={classes.postTime}>
              {format(status.createdAt)}
            </Typography>
          </div>
          {user._id === status.userId ? (
            <div className={classes.postTopRight}>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open_menu ? "true" : undefined}
                onClick={handleClick}
                className={classes.icon_button}
              >
                <MoreVertIcon className={classes.icon} />
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
                <div className={classes.menuItem}>
                  <MenuItem onClick={handleOpenDelete}>Xóa bài viết</MenuItem>
                  <Dialog
                    open={openDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDelete}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle className={classes.deleteHeader}>
                      {"Xóa bài viết?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-slide-description"
                        className={classes.deleteContent}
                      >
                        Bài viết sẽ bị xóa và không thể khôi phục?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDelete}>Hủy</Button>
                      <Button
                        onClick={(e) => Delete_post(e)}
                        className={classes.deleteBtn}
                      >
                        Xác nhận
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <div className={classes.menuItem}>
                  <MenuItem onClick={handleOpenEdit}>Sửa bài viết</MenuItem>
                  <Dialog
                    open={openEdit}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseEdit}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle className={classes.EditHeader}>
                      {"Sửa bài viết?"}
                    </DialogTitle>
                    <DialogContent>
                      <form onSubmit={submitEditHandler}>
                        <TextareaAutosize
                          aria-label="empty textarea"
                          placeholder="Empty"
                          defaultValue={status.desc}
                          className={classes.textArea}
                          ref={desc}
                        />
                        <img
                          src={status.img}
                          alt=""
                          className={classes.postImg}
                        />
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEdit}>Hủy</Button>
                      <Button
                        type="submit"
                        onClick={(e) => Edit_post(e)}
                        className={classes.deleteBtn}
                      >
                        Xác nhận
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Menu>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={classes.postCenter}>
          <TextareaAutosize
            aria-label="empty textarea"
            value={status.desc}
            className={classes.textAreaDisable}
            disabled
          />
          {/* <Typography>{status.desc}</Typography> */}
          {!status.video && status.img && (
            <img src={status.img} alt="" className={classes.postImg} />
          )}

          {status.video && !status.img && (
            <div className={classes.iframeContainer}>
              <iframe
                className={classes.iframeItem}
                src={status.video}
                frameBorder="0"
              ></iframe>
            </div>
          )}
          {status.video && status.img && (
            <Carousel>
              <div className={classes.iframeContainer}>
                <img src={status.img} alt="" className={classes.iframeItem} />
              </div>

              <div className={classes.iframeContainer}>
                <iframe
                  className={classes.iframeItem}
                  src={status.video}
                  frameBorder="0"
                ></iframe>
              </div>
            </Carousel>
          )}
        </div>

        <div className={classes.postBottom}>
          {isLiked ? (
            <div className={classes.postBottomLeft}>
              <GradeIcon
                onClick={likeHandle}
                className={classes.likebtnactive}
              />
              <Typography variant="body1" className={classes.likeCounteractive}>
                {like} lượt thích
              </Typography>
            </div>
          ) : (
            <div className={classes.postBottomLeft}>
              <GradeIcon onClick={likeHandle} className={classes.likebtn} />
              <Typography variant="body1" className={classes.likeCounter}>
                {like} lượt thích
              </Typography>
            </div>
          )}
          <div className={classes.postBottomRight}>
            {comments.length === 0 ? (
              <Typography variant="body1" className={classes.TextCounter}>
                Chưa có bình luận
              </Typography>
            ) : (
              <Typography variant="body1" className={classes.TextCounter}>
                {comments.length} bình luận
              </Typography>
            )}
          </div>
        </div>
        <Divider />
        {comments.length === 0 ? (
          <></>
        ) : (
          comments.map((cmt) => (
            <Comment
              cmt={cmt}
              deleteComment={(id) =>
                setComments(comments.filter((post) => post._id !== id))
              }
            />
          ))
        )}

        <InputCmt
          idPost={post._id}
          addCmts={(comment) => setComments([...comments, comment])}
        />
      </div>
    </Container>
  );
}
