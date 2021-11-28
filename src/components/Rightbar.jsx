import React from "react";
import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    position: "sticky",
    height: "100vh",
    top: "0",
    overflowY: "scroll",
  },
  rightbarFriendList: {
    padding: "0",
    margin: "0",
    listStyle: "none",
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
}));
export default function Rightbar() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.rightBarWrapper}>
        <Typography variant="h6">Bạn bè</Typography>
        <ul className={classes.rightbarFriendList}>
          <li className={classes.rightBarFriend}>
            <div className={classes.rightBarFriendInfo}>
              <Avatar
                alt="Cindy Baker"
                src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg"
                className={classes.image}
              />
              <Typography variant="body1" className={classes.text}>
                Bạn bè
              </Typography>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}
