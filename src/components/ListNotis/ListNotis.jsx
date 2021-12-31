import React, { useState, useEffect, useContext, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@material-ui/core";
import "./ListNotis.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import parse from "html-react-parser";
export default function ListNotis() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const slug = useParams().slug;
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [cateName, setCateName] = useState("");
  const [pages, setPages] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchNotifications = async (page) => {
    try {
      const res = await axios.get(`/notifications/cate/${slug}?page=${page}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setNotifications(res.data.notifications);
      setCateName(res.data.cate.name);
      setPages(Math.ceil(res.data.len / 10));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications(page);
  }, [slug, page]);

  return (
    <div>
      <div className="category-name blue ">
        <span>
          <Link className="link-text" to="/notification">
            Danh mục
          </Link>
          {` >> ${cateName}`}
        </span>
      </div>

      <div className="ListContainer">
        <ul className="list-container">
          {notifications.map((noti) => (
            <li key={noti._id} className="item-notification">
              <span className="title">{noti.title}</span>
              <div className="content">{parse(noti.content)}</div>
              <div className="notification-footer">
                <Link to={`/notification/noti/${noti._id}`}>
                  Chi tiết thông báo
                </Link>
                <span>Ngày đăng: {noti.createdAt.slice(0, 10)}</span>
              </div>
            </li>
          ))}
        </ul>
        <Stack spacing={2}>
          <Typography>Trang: {page}</Typography>
          <Pagination count={pages} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
}
