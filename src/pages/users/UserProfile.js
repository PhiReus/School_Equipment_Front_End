import React, { useEffect, useState } from "react";
import LayoutMaster from "../../layouts/LayoutMaster";
import UserModel from "../../models/UserModel";
import { Link, useParams } from "react-router-dom";
import GroupModel from "../../models/GroupModel";
import NestModel from "../../models/NestModel";

function UserProfile(props) {
  const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
  
  const [acc, setAcc] = useState({});
  useEffect(() => {
    UserModel.find(acc1.id)
      .then((res) => {
        const data = res.data; // Truy cập dữ liệu từ kết quả
        setAcc(data); // Đặt giá trị của acc bằng dữ liệu
      })
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  }, []);
  
  // console.log(acc);
  const [groups, setGroups] = useState([]);
  const [nests, setNests] = useState([]);
  const getGroupNameById = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    return group ? group.name : "";
  };
  
  const getNestNameById = (nestId) => {
    const nest = nests.find((nest) => nest.id === nestId);
    return nest ? nest.name : "";
  };

  useEffect(() => {
    GroupModel.all()
      .then((res) => {
        setGroups(res);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    NestModel.all()
      .then((res) => {
        setNests(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  return (
    <LayoutMaster>
      <>
        <header className="page-title-bar">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">
              </li>
            </ol>
          </nav>
          <div className="d-md-flex align-items-md-start">
            <h1 className="page-title mr-sm-auto">
              Xem thông tin chi tiết :{" "}
            </h1>
          </div>
        </header>
        <div className="page-section">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-fluid">
                <h6 className="card-header"> Chi tiết </h6>
                <nav className="nav nav-tabs flex-column border-0">
                  <Link href="" className="nav-link">
                    Chi tiết giáo viên
                  </Link>
                  <Link to="/users/update-profile" className="nav-link">Chỉnh sửa giáo viên</Link>
                    
                </nav>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card card-fluid">
                <h6 className="card-header"> Hồ sơ công khai </h6>
                <div className="card-body">
                  <div className="media mb-3">
                    <div className="user-avatar user-avatar-xl fileinput-button">
                      <img src={acc.url_image}/>
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
                        <p>{getGroupNameById(acc.group_id)}</p>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="input04" className="col-md-3">
                        Tổ :
                      </label>
                      <div className="col-md-9 mb-3">
                        <p>{getNestNameById(acc.nest_id)}</p>
                      </div>
                    </div>
                    <hr />
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
