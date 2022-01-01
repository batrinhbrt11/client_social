import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import "./ListNotis/ListNotis.css";
import axios from "axios";
export default function ItemListNotification({ noti, category }) {
  const [cate, setCate] = useState({});
  const getCateName = async (id) => {
    const cate = await axios.get(`/admin/categories/${id}`);
    setCate(cate.data);
  };
  useEffect(() => {
    getCateName(noti.categoryId);
  }, []);
  return (
    <div>
      <span className="title">{noti.title}</span>
      <div className="content">{parse(noti.content)}</div>
      <div className="notification-footer">
        <Link to={`/notification/noti/${noti._id}`}>Chi tiết thông báo</Link>
        <div>
          {category && (
            <Link to={`/notification/${cate.slug}`}>{cate.name} || </Link>
          )}

          <span>Ngày đăng: {noti.createdAt.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
}
