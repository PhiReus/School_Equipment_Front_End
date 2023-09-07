import React, { useEffect, useState } from "react";
import LayoutMaster from "../../layouts/LayoutMaster";
import UserModel from "../../models/UserModel";
import { Link } from "react-router-dom";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const anh = "http://127.0.0.1:8000";


  useEffect(() => {
    UserModel.all()
      .then((res) => {
        setUsers(res);
        // console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <LayoutMaster>
      <header className="page-title-bar">
        <h1 className="page-title"> Quản Lý Giáo Viên </h1>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>E-mail</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>anh</th>
            <th>Chức vụ</th>
            <th>Tổ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(users)} */}
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>
                {" "}
                <Link to={"/users/" + user.id + "/edit"}>
                  {" "}
                  {user.name}{" "}
                </Link>{" "}
              </td>
              <td> {user.email} </td>
              <td> {user.address} </td>
              <td> {user.phone} </td>
              <td>
                <img
                  src={anh + user.image}
                  alt="Ảnh"
                  width="80"
                  height="100"
                />
              </td>
              <td> {user.group.name} </td>
              <td> {user.nest.name} </td>
              <td>
                <Link to={"/users/" + user.id + "/edit"}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutMaster>
  );
}

export default UserList;
