import React, { useEffect, useState, useContext, useRef } from "react";
import "../css/ProfileRight.css";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { CircularProgress } from "@mui/material";
export default function ProfileRight({ user, changeUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { token, user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );
  const [loading, setLoading] = useState(false);
  const editName = useRef();
  const editCity = useRef();
  //edit info modal
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Edit_info = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let name_edit = "";
      let city_edit = "";
      if (editName.current.value === "") {
        name_edit = currentUser.username;
      } else {
        name_edit = editName.current.value;
      }

      if (editCity.current.value === "") {
        city_edit = currentUser.city;
      } else {
        city_edit = editCity.current.value;
      }
      const newInfo = {
        username: name_edit,
        city: city_edit,
      };

      await axios.put(
        `/users/${currentUser._id}`,

        newInfo,
        { headers: { "x-access-token": token } }
      );

      await dispatch({ type: "EDIT_INFO", payload: newInfo });
      const res = await axios.get(`/users/${currentUser._id}`, {
        headers: { "x-access-token": token },
      });
      changeUser(res.data);
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //end edit info modal
  useEffect(() => {
    const ourRequest = axios.CancelToken.source(); //1st step

    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "/users/friends/" + user._id,
          {
            headers: { "x-access-token": token },
          },
          {
            cancelToken: ourRequest.token, //2nd step
          }
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getFriends();
    }, 3000);
    return () => {
      ourRequest.cancel("cancel by user"); //3rd step
    };
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <div>
      {user._id !== currentUser._id && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
        </button>
      )}
      <div className="rightbarInfoContainer">
        <h4 className="rightbarTitle">
          Thông tin
          {user._id === currentUser._id ? (
            <CreateIcon className="rightbarIcon" onClick={handleClickOpen} />
          ) : (
            <></>
          )}
        </h4>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="form_update_header">
            Sửa thông tin
          </DialogTitle>

          {loading ? (
            <DialogContent className="loadingProgress">
              <CircularProgress color="inherit" />
            </DialogContent>
          ) : (
            <DialogContent>
              <form className="form_update_info">
                <div className="form_update_info-item">
                  <label htmlFor="fname" className="form_update_info-label">
                    Tên hiển thị:
                  </label>
                  <input
                    aria-label=""
                    className="form_update_info-input"
                    defaultValue={currentUser.username}
                    ref={editName}
                  />
                </div>
                <div className="form_update_info-item">
                  <label htmlFor="faculty" className="form_update_info-label">
                    Khoa:
                  </label>
                  <select className="form_update_info-input">
                    <option value="0">Chọn khoa:</option>
                    <option value="1">CNTT</option>
                    <option value="2">DIen</option>
                    <option value="2">abd</option>
                  </select>
                </div>
                <div className="form_update_info-item">
                  <label htmlFor="city" className="form_update_info-label">
                    Thành phố:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form_update_info-input"
                    defaultValue={currentUser.city}
                    ref={editCity}
                  />
                </div>
              </form>
            </DialogContent>
          )}

          <DialogActions>
            <Button onClick={handleClose} className="button_cancel">
              Hủy
            </Button>
            <Button onClick={(e) => Edit_info(e)} className="button_edit">
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Khoa:</span>
            <span className="rightbarInfoValue">{user.faculty}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Chức vụ:</span>
            <span className="rightbarInfoValue">
              {user.authorize === 3 ? "Sinh viên" : "Quản lí"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Thành phố:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
        </div>
      </div>

      <div className="rightbarFollowingsContainer">
        <h4 className="rightbarTitle">Bạn bè</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link key={friend._id} to={"/profile/" + friend._id}>
              <div className="rightbarFollowing">
                <img
                  alt=""
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "person/noAvartar.jpg"
                  }
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
