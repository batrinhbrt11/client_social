import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GradeIcon from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const useStyles = makeStyles((theme) => ({
  post: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: "10px",
    "-webkit-box-shadow": "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: " 0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
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
}));
export default function Post({ post }) {
  const classes = useStyles();

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const likeHandle = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: user._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [userPost, setUserPost] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setUserPost(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <Container className={classes.post}>
      <div className={classes.postWrapper}>
        <div className={classes.postTop}>
          <div className={classes.postTopLeft}>
            <Avatar
              alt=""
              src={
                userPost.profilePicture
                  ? PF + userPost.profilePicture
                  : PF + "person/noAvartar.jpg"
              }
              className={classes.avatar}
            />

            <Link to={`/profile/${userPost._id}`}>
              <Typography variant="body1" className={classes.postUsername}>
                {userPost.username}
              </Typography>
            </Link>
            <Typography variant="body1" className={classes.postTime}>
              {format(post.createdAt)}
            </Typography>
          </div>
          <div className={classes.postTopRight}>
            <MoreVertIcon />
          </div>
        </div>
        <div className={classes.postCenter}>
          <Typography variant="body1" className={classes.postText}>
            {post.desc}
          </Typography>
          <img src={PF + post.img} alt="" className={classes.postImg} />
        </div>
        <Divider />
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
            <Typography variant="body1" className={classes.TextCounter}>
              {post.comment} bình luận
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
}
