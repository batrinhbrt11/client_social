import React, { useEffect, useState, useContext } from "react";
import "../css/ProfileRight.css";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
export default function ProfileRight({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
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
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
        </button>
      )}
      <div className="rightbarInfoContainer">
        <h4 className="rightbarTitle">
          Thông tin <CreateIcon className="rightbarIcon" />
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Khoa:</span>
            <span className="rightbarInfoValue">{user.department}</span>
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
            <Link to={"/profile/" + friend._id}>
              <div className="rightbarFollowing">
                <img
                  alt=""
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
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
