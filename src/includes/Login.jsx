import React, { useState } from "react";
import Blank from "../layouts/Blank";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AuthModel from "../models/AuthModel";
import Swal from "sweetalert2";
function Login(props) {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email !"),
    password: Yup.string().required("Vui lòng nhập mật khẩu !"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    AuthModel.login(account)
      .then((res) => {
        // console.log("API Response:", res);
        const { access_token } = res.data;
        setAccount(res.data);
        // Lưu JWT vào bộ nhớ trình duyệt
        localStorage.setItem("jwtToken", access_token);
        const { user } = res.data;

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Devices");
        handleLoginSuccess();
      })
      .catch((error) => {
        alert("đăng nhập thất bại");
        console.log(error);

        navigate("/login");
      });
  };
  const handleLoginSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Đăng nhập thành công!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleOnChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  return (
    <Blank>
      <form className="auth-form" onSubmit={handleLogin}>
        {/* .form-group */}
        <div className="form-group">
          <div className="form-label-group">
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Email"
              autofocus=""
              name="email"
              value={account.email}
              onChange={handleOnChange}
            />{" "}
            <label htmlFor="inputUser">Email</label>
          </div>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group">
          <div className="form-label-group">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Mật khẩu"
              name="password"
              value={account.password}
              onChange={handleOnChange}
            />{" "}
            <label htmlFor="inputPassword">Mật khẩu</label>
          </div>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Đăng Nhập
          </button>
        </div>
        {/* /.form-group */}
        {/* .form-group */}
        <div className="form-group text-center">
          <div className="custom-control custom-control-inline custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="remember-me"
            />{" "}
            <label className="custom-control-label" htmlFor="remember-me">
              Ghi nhớ mật khẩu
            </label>
          </div>
        </div>
        {/* /.form-group */}
        {/* recovery links */}
        <div className="text-center pt-3">
          <Link to={"/forgot"} className="link">
            Quên mật khẩu?
          </Link>
        </div>
        {/* /recovery links */}
      </form>
    </Blank>
  );
}

export default Login;
