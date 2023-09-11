import React, { useEffect, useState } from "react";
import LayoutMaster from "../../layouts/LayoutMaster";
import UserModel from "../../models/UserModel";
import { useParams } from "react-router-dom";

function UserProfile(props) {

  const [acc, setAcc] = useState(JSON.parse(localStorage.getItem('user')));
  console.log(acc);
  const urlimage = 'http://127.0.0.1:8000';

  return (
    <LayoutMaster>
      <>
        <header className="page-title-bar">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">
                <a href="#">
                  <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                  Trang Chủ
                </a>
              </li>
            </ol>
          </nav>
          <div className="d-md-flex align-items-md-start">
            <h1 className="page-title mr-sm-auto">
              Xem thông tin chi tiết giáo viên :{" "}
            </h1>
          </div>
        </header>
        <div className="page-section">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-fluid">
                <h6 className="card-header"> Chi tiết </h6>
                <nav className="nav nav-tabs flex-column border-0">
                  <a href="" className="nav-link active">
                    Chi tiết giáo viên
                  </a>
                  <a href="" className="nav-link">
                    Lịch sử mượn
                  </a>
                </nav>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card card-fluid">
                <h6 className="card-header"> Hồ sơ công khai </h6>
                <div className="card-body">
                  <div className="media mb-3">
                    <div className="user-avatar user-avatar-xl fileinput-button">
                      <img src={urlimage + acc.image}/>
                      
                    </div>
                    <div className="media-body pl-3">
                      <div
                        id="progress-avatar"
                        className="progress progress-xs fade"
                      >
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                  <form method="post">
                    <div className="form-row">
                      <label htmlFor="input01" className="col-md-3">
                        Tên giáo viên : 
                      </label>
                      <div className="col-md-9 mb-3">
                        <div className="custom-file">
                         <p>{acc.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input02" className="col-md-3">
                        E-mail : 
                      </label>
                      <div className="col-md-9 mb-3">
                       <p>{acc.email}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input03" className="col-md-3">
                        Số điện thoại : 
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.phone}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Địa chỉ : 
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.address}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Giới tính : 
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.gender}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Ngày sinh : 
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.birthday}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Chức vụ :
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.group_id}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Tổ :
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{acc.nest_id}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="form-actions">
                      <a
                        className="btn btn-dark"
                        href="{{ route('users.index') }}"
                      >
                        <i className="fa fa-arrow-left mr-2" /> Quay lại
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </LayoutMaster>
  );
}

export default UserProfile;
