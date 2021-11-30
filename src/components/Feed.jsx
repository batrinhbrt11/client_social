import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Container, makeStyles } from "@material-ui/core";
import Share from "./Share";
import Post from "./Post";
import { AuthContext } from "../Context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

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
        ? await axios.get(`/posts/profile/${userId}?page=1`)
        : await axios.get(`posts/timeline/${user._id}?page=1`);
      const postData = res.data;

      setPosts(postData);
      console.log(postData);
    };
    fetchPosts();
  }, [userId, user._id]);
  let [page, setPage] = useState(2);
  const [noMore, setNoMore] = useState(true);
  const fetchPosts2 = async () => {
    const res = userId
      ? await axios.get(`/posts/profile/${userId}?page=${page}`)
      : await axios.get(`posts/timeline/${user._id}?page=${page}`);
    const postData2 = res.data;

    return postData2;
  };
  const fetchMoreData = async () => {
    const next_postdata = await fetchPosts2();
    setPosts([...posts, ...next_postdata]);
    if (next_postdata.length === 0 || next_postdata < 10) {
      setNoMore(false);
    }
    setPage(page + 1);
  };
  console.log(posts);
  return (
    <Container className={classes.feed}>
      <div className={classes.feedWrapper}>
        {(!userId || userId === user._id) && <Share />}
        <div>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={noMore}
            loader={<h4>Loading...</h4>}
            style={{ padding: "1px" }}
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  padding: "10px",
                  borderRadius: "16px",
                  background: "#647dd7",

                  color: "white",
                }}
              >
                Đã xem hết tât!!!
              </p>
            }
          >
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Container>
  );
}
