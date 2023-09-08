import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BorrowModel from '../../models/BorrowModel';
import LayoutMaster from '../../layouts/LayoutMaster';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.full.min.js';
import { Field, Form, Formik } from 'formik';
import $ from 'jquery';


const SignupSchema = Yup.object().shape({
  borrow_date: Yup.string().required('Required'),
  borrow_note: Yup.string().required('Required'),
});

function BorrowCreate(props) {
  const navigate = useNavigate();
  const [deviceIds, setDeviceIds] = useState([]);

  useEffect(() => {
    $('#devices').select2({
      placeholder: 'Chọn một tùy chọn', // Add the placeholder option
      minimumInputLength: 1, // Add the minimumInputLength option
    });
  }, []);

  const handleAddToDanhSach = () => {
    const selectedDevice = $('#devices');
    const device_id = selectedDevice.val();

    if (device_id && !deviceIds.includes(device_id)) {
      const device_name = selectedDevice.find('option:selected').text();
      const newDeviceIds = [...deviceIds, device_id];
      setDeviceIds(newDeviceIds);

      const deviceList = document.getElementById('device_list');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${device_id}</td>
        <td>${device_name}<input name="devices[id][]" type="hidden" value="${device_id}"></td>
        <td><Field name="devices[lesson_name][]" type="text" className="form-control input-sm" /></td>
        <td width="100"><Field name="devices[quantity][]" type="number" className="form-control input-sm" /></td>
        <td width="120">
            <Field name="devices[session][]" as="select" className="form-control">
                <option value="Sáng">Sáng</option>
                <option value="Chiều">Chiều</option>
            </Field>
        </td>
        <td width="100"><Field name="devices[lecture_name][]" type="text" className="form-control input-sm" /></td>
        <td>
            <Field name="devices[room_id][]" as="select" className="form-control">
                {props.rooms.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </Field>
        </td>
        <td width="100">
            <Field name="devices[lecture_number][]" as="select" className="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Field>
        </td>
        <td><Field name="devices[return_date][]" type="date" className="form-control input-sm" /></td>
        <td><button data-id="${device_id}" type="button" className="btn btn-sm btn-icon btn-secondary remove-device"><i className="far fa-trash"></i></button></td>
      `;
      deviceList.appendChild(newRow);

      selectedDevice.val('').trigger('change'); // Đặt giá trị của Select2 thành trống và kích hoạt sự kiện thay đổi
    } else if (device_id && deviceIds.includes(device_id)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Thiết bị này đã có trong danh sách!',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vui lòng lựa chọn thiết bị!',
      });
    }
  };

  const handleRemoveDevice = (device_id) => {
    const newDeviceIds = deviceIds.filter((id) => id !== device_id);
    setDeviceIds(newDeviceIds);

    const deviceList = document.getElementById('device_list');
    const deviceRow = document.querySelector(`#device_list tr[data-id="${device_id}"]`);
    deviceList.removeChild(deviceRow);
  };

  const handleSubmit = (data) => {
    data.devices = deviceIds;
    BorrowModel.store(data)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm thành công!',
          showConfirmButton: false,
          timer: 2000,
        });

        navigate('/borrows');
      })
      .catch((error) => {
        console.error('Error creating borrow:', error.message);
      });
  };

  return (
    <LayoutMaster>
      <header className="page-title-bar">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link to="/borrows">
                <i className="breadcrumb-icon fa fa-angle-left mr-2"></i>Quản Lý Thiết Bị
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="page-title">Thêm Phiếu Mượn</h1>
      </header>
      <div className="page-section">
        <Formik
          initialValues={{
            borrow_date: '',
            borrow_note: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="card">
                <div className="card-body">
                  <legend>Thông tin cơ bản</legend>
                  <div className="form-group">
                    <label htmlFor="borrow_date">Ngày mượn</label>
                    <Field
                      type="date"
                      name="borrow_date"
                      className="form-control"
                      placeholder="Nhập ngày mượn"
                    />
                    {errors.borrow_date && touched.borrow_date ? (
                      <div className="text-danger">{errors.borrow_date}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="borrow_note">Ghi chú</label>
                    <Field
                      as="textarea"
                      name="borrow_note"
                      className="form-control"
                      placeholder="Nhập ghi chú"
                    />
                    {errors.borrow_note && touched.borrow_note ? (
                      <div className="text-danger">{errors.borrow_note}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary ml-auto">
                      Lưu
                    </button>
                    <button
                      onClick={() => navigate('/borrows')}
                      className="btn btn-secondary float-right"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <legend>Chi tiết phiếu mượn</legend>
                  <div className="row">
                    <div className="col">
                      <select id="devices" className="form-control" name="state" />
                    </div>
                    <div className="col-lg-2">
                      <button
                        id="addToDanhSach"
                        className="btn btn-primary"
                        type="button"
                        onClick={handleAddToDanhSach}
                      >
                        Thêm vào danh sách
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Tên</th>
                              <th>Tên bài dạy</th>
                              <th>Số lượng</th>
                              <th>Buổi</th>
                              <th>Tiết PCCT</th>
                              <th>Lớp</th>
                              <th>Tiết TKB</th>
                              <th>Ngày trả</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody id="device_list">
                            {deviceIds.map((device_id) => (
                              <tr key={device_id} data-id={device_id}>
                                <td>{device_id}</td>
                                <td>
                                  <Field
                                    name={`devices[${device_id}].room_id`}
                                    as="select"
                                    className="form-control"
                                  >
                                    {props.rooms.map((room) => (
                                      <option key={room.id} value={room.id}>
                                        {room.name}
                                      </option>
                                    ))}
                                  </Field>
                                </td>
                                <td>
                                  <Field
                                    name={`devices[${device_id}].lesson_name`}
                                    type="text"
                                    className="form-control input-sm"
                                  />
                                </td>
                                <td width="100">
                                  <Field
                                    name={`devices[${device_id}].quantity`}
                                    type="number"
                                    className="form-control input-sm"
                                  />
                                </td>
                                <td width="120">
                                  <Field
                                    name={`devices[${device_id}].session`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="Sáng">Sáng</option>
                                    <option value="Chiều">Chiều</option>
                                  </Field>
                                </td>
                                <td width="100">
                                  <Field
                                    name={`devices[${device_id}].lecture_name`}
                                    type="text"
                                    className="form-control input-sm"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`devices[${device_id}].room_id`}
                                    as="select"
                                    className="form-control"
                                  >
                                    {props.rooms.map((room) => (
                                      <option key={room.id} value={room.id}>
                                        {room.name}
                                      </option>
                                    ))}
                                  </Field>
                                </td>
                                <td width="100">
                                  <Field
                                    name={`devices[${device_id}].lecture_number`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </Field>
                                </td>
                                <td>
                                  <Field
                                    name={`devices[${device_id}].return_date`}
                                    type="date"
                                    className="form-control input-sm"
                                  />
                                </td>
                                <td>
                                  <button
                                    data-id={device_id}
                                    type="button"
                                    className="btn btn-sm btn-icon btn-secondary remove-device"
                                    onClick={() => handleRemoveDevice(device_id)}
                                  >
                                    <i className="far fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <Link className="btn btn-secondary float-right" to="/borrows">
                      Hủy
                    </Link>
                    <button className="btn btn-primary ml-auto" type="submit">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </LayoutMaster>
  );
}

export default BorrowCreate;
