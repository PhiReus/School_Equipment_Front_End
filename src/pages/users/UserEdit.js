import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import UserModel from "../../models/UserModel";
import LayoutMaster from "../../layouts/LayoutMaster";
import axios from "axios";
import GroupModel from "../../models/GroupModel";
import NestModel from "../../models/NestModel";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống !"),
  email: Yup.string().required("Không được để trống !"),
  address: Yup.string().required("Không được để trống !"),
  phone: Yup.string().required("Không được để trống !"),
  gender: Yup.string().required("Không được để trống !"),
  birthday: Yup.string().required("Không được để trống !"),
  group_id: Yup.string().required("Không được để trống !"),
  nest_id: Yup.string().required("Không được để trống !"),
});

function UserEdit(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    birthday: "",
    group_id: "",
    nest_id: "",
    password: "",
    image:""
  });
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [nests, setNests] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const anh = "http://127.0.0.1:8000";

  useEffect(() => {
    UserModel.find(id)
      .then((res) => {
        setForm(res.data);
        setImagePreview(res.data.image);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy tệp hình ảnh đầu tiên từ danh sách tệp được chọn
    setImage(file);
  };

  const handleSubmit = (data) => {
    const formData = new FormData();
    const inputElement = document.getElementById('fileInput');
  // Lấy đối tượng File từ input
    const file = inputElement.files[0];
    formData.append('image', file);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("birthday", data.birthday);
    formData.append("group_id", data.group_id);
    formData.append("nest_id", data.nest_id);
    formData.append("password", data.password);

    
    UserModel.update(id, data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Lỗi khi sửa :", err);
      });
    
  };
  // console.log(form);
  return (
    <LayoutMaster>
      <header className="page-title-bar">
        <h1 className="page-title"> Chỉnh Sửa Thông Tin Giáo Viên </h1>
      </header>
      <Formik
        initialValues={form}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form enctype="multipart/form-data">
            <div className="card">
              <div className="card-body">
                <legend>Thông tin cơ bản</legend>
                <div className="form-group">
                  <label htmlFor="tf1">Tên giáo viên</label>{" "}
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên giáo viên"
                  />
                  <small className="form-text text-muted" />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">E-mail</label>{" "}
                  <Field
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Nhập email"
                  />
                  <small className="form-text text-muted" />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">Địa chỉ</label>{" "}
                  <Field
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                  />
                  <small className="form-text text-muted" />
                  {errors.address && touched.address ? (
                    <div>{errors.address}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">Số điện thoại</label>{" "}
                  <Field
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoai"
                  />
                  <small className="form-text text-muted" />
                  {errors.phone && touched.phone ? (
                    <div>{errors.phone}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">Giới tính</label>{" "}
                  <Field as="select" name="gender" className="form-control">
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </Field>
                  <small className="form-text text-muted" />
                  {errors.gender && touched.gender ? (
                    <div>{errors.gender}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="tf1">Ngày sinh</label>{" "}
                  <Field
                    type="date"
                    name="birthday"
                    className="form-control"
                    placeholder="Nhập ngày sinh"
                  />
                  <small className="form-text text-muted" />
                  {errors.birthday && touched.birthday ? (
                    <div>{errors.birthday}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">Chức vụ</label>
                  <Field as="select" name="group_id" className="form-control">
                    {groups.map((group) => (
                      <option
                        key={group.id}
                        value={group.id}
                        selected={form.group_id === group.id}
                      >
                        {group.name}
                      </option>
                    ))}
                  </Field>

                  <small className="form-text text-muted" />
                  {errors.group_id && touched.group_id ? (
                    <div>{errors.group_id}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="tf1">Tổ</label>
                  <Field as="select" name="nest_id" className="form-control">
                    {nests.map((nest) => (
                      <option
                        key={nest.id}
                        value={nest.id}
                        selected={form.nest_id === nest.id}
                      >
                        {nest.name}
                      </option>
                    ))}
                  </Field>

                  <small className="form-text text-muted" />
                  {errors.nest_id && touched.nest_id ? (
                    <div>{errors.nest_id}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="tf1">Mật khẩu</label>{" "}
                  <Field
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder="Để trống nếu không thay đổi"
                  />
                  <small className="form-text text-muted" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="tf1">Hình ảnh</label>{" "}
                  <input
                    type="file"
                    id="fileInput"
                    name="image"
                    className="form-control"
                    placeholder="Chọn hình ảnh"
                    onChange={(e) => handleImageChange(e)}
                    // value={image} // Thêm thuộc tính value
                  />
                  <small className="form-text text-muted" />
                </div>
                {imagePreview && (
                  <img
                    src={anh + imagePreview}
                    alt="Ảnh"
                    width="100"
                    height="100"
                  />
                )}
                <div className="form-actions">
                  <Link className="btn btn-secondary float-right" to="/">
                    Hủy
                  </Link>
                  <button className="btn btn-primary ml-auto" type="submit">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </LayoutMaster>
  );
}

export default UserEdit;
