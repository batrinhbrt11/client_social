import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Container, makeStyles } from "@material-ui/core";
import Share from "./Share";
import Post from "./Post";
import { AuthContext } from "../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
  feedWrapper: {},
}));
export default function Feed({ userId }) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = userId
        ? await axios.get("/posts/profile/" + userId)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userId, user._id]);

  return (
    <Container className={classes.feed}>
      <div className={classes.feedWrapper}>
        {(!userId || userId === user._id) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </Container>
  );
}
