import {
  AppBar,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  alpha,
  Badge,
  Avatar,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Cancel } from "@material-ui/icons";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#212121",
  },
  logoLg: {
    display: "none",
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  logoSm: {
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      display: "flex !important",
    },
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  icon: {
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "#40c4ff",
    },
  },
  badge: {
    marginRight: theme.spacing(2),
  },

  logoSm_Text: {
    color: "white",
  },
  subMenu: {
    display: "block",
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_menu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    setAnchorEl(null);
  };
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logoLg}>
          <Typography variant="h6">META</Typography>
        </Link>
        <div className={classes.logoSm}>
          <Drawer />
          <Link to="/">
            <Typography variant="h6" className={classes.logoSm_Text}>
              META
            </Typography>
          </Link>
        </div>

        <div className={classes.search}>
          <SearchIcon />
          <InputBase placeholder="Tìm kiếm...." className={classes.input} />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <SearchIcon
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />

          <Link to={`/profile/${user._id}`}>
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
          <div>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open_menu ? "true" : undefined}
              onClick={handleClick}
            >
              <ArrowDropDownCircleIcon className={classes.icon} />
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
              <MenuItem onClick={handleClose}>Thông tin</MenuItem>
              <MenuItem onClick={Logout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
