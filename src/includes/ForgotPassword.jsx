import React from 'react';
import Blank from '../layouts/Blank';
import { Link } from 'react-router-dom';

function ForgotPassword(props) {
    

    return (
        <Blank>
            <form method="POST" action="#" className="auth-form auth-form-reflow">
                <div className="text-center mb-4">
                    <div className="mb-4">
                        <img
                            className="rounded"
                            src="assets/apple-touch-icon.png"
                            alt=""
                            height={72}
                        />
                    </div>
                    <h1 className="h3"> Đặt Lại Mật Khẩu </h1>
                </div>
                <p className="mb-4"></p>
                {/* .form-group */}
                <div className="form-group mb-4">
                    <label className="d-block text-left" htmlFor="inputUser">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        defaultValue=""
                        required=""
                        autofocus=""
                        className="form-control form-control-lg"
                    />
                    <p className="text-muted">
                        <small>
                            Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email của bạn.
                        </small>
                    </p>
                </div>
                {/* /.form-group */}
                {/* actions */}
                <div className="d-block d-md-inline-block mb-2">
                    <button className="btn btn-lg btn-block btn-primary" type="submit">
                        Đặt Lại Mật Khẩu
                    </button>
                </div>
                <div className="d-block d-md-inline-block">
                    <Link to={'/login'} className="btn btn-block btn-light">
                        Quay Về Đăng Nhập
                    </Link>
                </div>
            </form>

        </Blank>
    );
}

export default ForgotPassword;