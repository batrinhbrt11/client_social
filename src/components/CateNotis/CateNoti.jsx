import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import "./CateNoti.css";
import { Link } from "react-router-dom";
export default function CateNoti() {
  const [notis, setNotis] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/admin/categories");
        const data = res.data;
        setNotis(data);
        let arr = [];
        data.map((noti) => {
          if (noti.name.toUpperCase().includes("KHOA")) {
            arr.push(noti);
          }
        });
        setFaculties(arr);
        setCategories(data.filter((x) => !arr.includes(x)));
      } catch (err) {
        console.log("Requet cancel", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <h3 className="noti-faculty">Phân loại theo khoa</h3>
        <div className="grid-container">
          {faculties.map((noti) => (
            <Link key={noti._id} to={`/notification/${noti.slug}`}>
              <div className="grid-item">
                <img
                  src="https://old-stdportal.tdtu.edu.vn/Content/images/image.png"
                  className="item-img"
                />
                <div>
                  <div className="item-inner"></div>
                  <div className="item-footer">
                    <h5>{noti.name.toUpperCase()} </h5>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="container">
        <h3 className="noti-category">Phân loại theo danh mục</h3>
        <div className="grid-container">
          {categories.map((noti) => (
            <Link key={noti._id} to={`/notification/${noti.slug}`}>
              <div className="grid-item">
                <img
                  src="https://old-stdportal.tdtu.edu.vn/Content/images/image.png"
                  className="item-img"
                />
                <div>
                  <div className="item-inner"></div>
                  <div className="item-footer">
                    <h5>{noti.name.toUpperCase()} </h5>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
