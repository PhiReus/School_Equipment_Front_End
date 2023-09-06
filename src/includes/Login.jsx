import React, { useState } from 'react';
import Blank from '../layouts/Blank';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login(props) {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        email: '',
        password: ''
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', account);
            console.log(response.data?.access_token);
            const { token } = response.data?.access_token;
            // Lưu JWT vào bộ nhớ trình duyệt
            localStorage.setItem('jwtToken', token);
            const { user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            // Swal.fire({
            //     icon: "success",
            //     title: "Đăng nhập thành công!",
            //     showConfirmButton: false,
            //     timer: 1500,
            // });
            // alert('đăng nhập thành công!');
            // Điều hướng tới trang sau khi đăng nhập thành công
            navigate('/');
        } catch {
            alert('đăng nhập thất bại');
            navigate('/login');
        }
    }

    const handleOnChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
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
                            name='password'
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
                    <Link to={'/forgot'} className="link">
                        Quên mật khẩu?
                    </Link>
                </div>
                {/* /recovery links */}
            </form>
        </Blank>
    );
}

export default Login;


