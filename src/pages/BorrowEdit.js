import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BorrowModel from '../models/BorrowModel';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import RoomModel from '../models/RoomModel';
import Swal from 'sweetalert2';

const EditSchema = Yup.object().shape({
    borrow_date: Yup.string().required('Vui lòng nhập ngày mượn!'),
});

function EditBorrow() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
    const [formData, setFormData] = useState({});

    const [rooms, setRooms] = useState([]);
    const [createdAt, setCreatedAt] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const borrowModel = new BorrowModel();
        borrowModel.find(id)
            .then((res) => {
                setFormData(res);
            })
            .catch((error) => {
                console.error('Error fetching borrow data:', error);
            });
    },[])

    useEffect(() => {
        // Lấy ngày hiện tại và định dạng thành chuỗi yyyy-MM-ddTHH:mm để điền vào trường "Ngày tạo phiếu"
        const currentDate = new Date();
        const formattedDate = format(currentDate, "HH:mm:ss dd/MM/yyyy");
        setCreatedAt(formattedDate);

        const roomModel = new RoomModel();
        roomModel.getRoom()
            .then((res) => {
                setRooms(res);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });

        // Lấy dữ liệu phiếu mượn cần chỉnh sửa
        
    }, [id]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const borrowModel = new BorrowModel();
            const res = await borrowModel.update(id, values);

            if (res) {

                // Show a success message in Vietnamese
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Cập nhật phiếu mượn thành công!',
                });

                resetForm(); // Clear the form fields if needed
                navigate('/borrows'); // Navigate back to the 'borrows' page
            } else {
                console.error('Error updating borrow record.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    console.log(formData);
    return (  
        
        <LayoutMaster>
            <header className="page-title-bar">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/">
                                <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                                Trang Chủ
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className="d-md-flex align-items-md-start">
                    <h1 className="page-title mr-sm-auto"> Chỉnh Sửa Phiếu Mượn</h1>
                </div>
            </header>

            <Formik
                initialValues={formData}
                validationSchema={EditSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="card">
                            <div className="card-body">
                                <legend>Thông tin cơ bản</legend>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="user_id">Người mượn</label>
                                            <p className='form-control-static'>{acc1 ? acc1.name : ''}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="created_at">Ngày tạo phiếu</label>
                                            <p className='form-control-static'></p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="borrow_date">Ngày mượn</label>
                                            <Field
                                                type="date"
                                                name="borrow_date"
                                                className="form-control"
                                                placeholder="Nhập ngày mượn"
                                            />
                                            {/* {console.log(formData)} */}
                                            {/* {errors.borrow_date && touched.borrow_date && (
                                                <div style={{ color: 'red' }}>{errors.borrow_date}</div>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="borrow_note">Ghi chú</label>
                                    <Field as="textarea"
                                        name="borrow_note"
                                        className="form-control"
                                        placeholder="Nhập ghi chú"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-body">
                                    <legend>Chi tiết phiếu mượn</legend>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>Số lượng</th>
                                                    <th>Tên bài dạy</th>
                                                    <th>Buổi</th>
                                                    <th>Tiết PCCT</th>
                                                    <th>Lớp</th>
                                                    <th>Tiết TKB</th>
                                                    <th>Ngày trả</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                    <tr>
                                                        <td>{formData.data.id}</td>
                                                        <td className="device-cell">
                                                            <Link
                                                                to={`/devices/${device.id}`}
                                                                className="tile tile-img mr-1"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={formData.data.devices.image}
                                                                    alt=""
                                                                />
                                                            </Link>
                                                            <span>
                                                                {formData.data.devices.name || 'Tên không tồn tại'}
                                                            </span>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={formData.data.the_devices.quantity}
                                                                type="number"
                                                                className="form-control input-sm"
                                                            />

                                                        </td>


                                                        <td>
                                                            <Field
                                                                name={`devices[lesson_name][${index}]`}
                                                                type="text"
                                                                className="form-control input-sm"

                                                            />
                                                        </td>

                                                        <td width="120">
                                                            <Field
                                                                name={`devices[session][${index}]`}
                                                                as="select"
                                                                className="form-control"
                                                            >
                                                                <option value="Sáng">Sáng</option>
                                                                <option value="Chiều">Chiều</option>
                                                            </Field>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={`devices[lecture_name][${index}]`}
                                                                type="text"
                                                                className="form-control input-sm"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`devices[room_id][${index}]`}
                                                                as="select"
                                                                className="form-control"
                                                            >
                                                                {/* Sử dụng danh sách phòng từ state */}
                                                                {rooms.map((room) => (
                                                                    <option key={room.id} value={room.id}>{room.name}</option>
                                                                ))}
                                                            </Field>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={`devices[lecture_number][${index}]`}
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
                                                                name={`devices[return_date][${index}]`}
                                                                type="date"
                                                                className="form-control input-sm"
                                                            />
                                                        </td>


                                                    </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary ml-auto float-right">
                                            Cập nhật phiếu mượn
                                        </button>
                                        <Link to="/borrows" className="btn btn-secondary">
                                            Quay lại
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </LayoutMaster>
    );
}

export default EditBorrow;
