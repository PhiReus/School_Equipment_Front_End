import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Thêm import cho useDispatch
import { SET_CART } from '../redux/action';
import Swal from 'sweetalert2';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import RoomModel from '../models/RoomModel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; //
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const imageBaseUrl = 'http://127.0.0.1:8000'; // Đường dẫn cơ sở cho ảnh

const SignupSchema = Yup.object().shape({
    borrow_date: Yup.string().required('Required'),
});

function Cart(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        user_id: '',
        created_at: '',
        borrow_date: '',
        borrow_note: '',
        devices:
        {
            lesson_name: [],
            quantity: [],
            session: [],
        }
        ,
    });
    const [createdAt, setCreatedAt] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ local storage
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        // Set gia tri cho cart
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setData(cartData);

        // Set gia tri mac dinh cho lesson_name va quantity
        let emptyLessons = [];
        let emptyQuantity = [];
        let emptySession = [];
        let emptyLecture = [];
        let emptyRoom = [];
        let emptyLectureNumber = [];
        let emptyReturn = [];

        for (let i = 0; i < cartData.length; i++) {
            emptyLessons.push('')
            emptyQuantity.push(0)
            emptySession.push('Sáng')
            emptyLecture.push('')
            emptyRoom.push('')
            emptyLectureNumber.push('')
            emptyReturn.push('')
        }
        let new_devices = {
            lesson_name: emptyLessons,
            quantity: emptyQuantity,
            session: emptySession,
            lecture_name: emptyLecture,
            room_id: emptyRoom,
            lecture_number: emptyLectureNumber,
            return_date: emptyReturn,
            
        }
        setFormData({ ...formData, devices: new_devices });

        console.log(formData);


        // Lấy ngày hiện tại và định dạng thành chuỗi yyyy-MM-ddTHH:mm để điền vào trường "Ngày tạo phiếu"
        const currentDate = new Date();
        const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm");
        setCreatedAt(formattedDate);
        const roomModel = new RoomModel();
        roomModel.getRoom()
            .then((response) => {
                setRooms(response);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });

    }, []);


    const handleUpdateCart = (index, quantity) => {
        const newCart = [...data];
        newCart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch({
            type: SET_CART,
            payload: newCart,
        });
    };

    const handleDecreaseQuantity = (index) => {
        const newData = [...data];
        if (newData[index].quantity > 1) {
            newData[index].quantity--;
            handleUpdateCart(index, newData[index].quantity);
        }
    };

    const handleIncreaseQuantity = (index) => {
        const newData = [...data];
        newData[index].quantity++;
        handleUpdateCart(index, newData[index].quantity);
    };

    const handleRemove = (index) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn đang chuẩn bị xóa mục này khỏi phiếu mượn.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có, xóa đi!',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = [...data];
                newData.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(newData));
                dispatch({
                    type: SET_CART,
                    payload: newData,
                });
                Swal.fire('Đã xóa!', 'Mục đã được xóa khỏi phiếu mượn.', 'success');
            }
        });
    };


    const handleSubmit = (values) => {
        console.log('Form submitted with values:', values);
        // localStorage.removeItem('cart');
        // dispatch({ type: SET_CART, payload: [] });
        // navigate('/borrows');
    };

    return (
        <LayoutMaster>

            <header className="page-title-bar">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <a href="{{ route('devices.index') }}">
                                <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                                Trang Chủ
                            </a>
                        </li>
                    </ol>
                </nav>
                <div className="d-md-flex align-items-md-start">
                    <h1 className="page-title mr-sm-auto"> Phiếu Mượn</h1>
                </div>
            </header>
            <Formik
                initialValues={formData}
                validationSchema={SignupSchema}
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
                                            <Field
                                                type="text"
                                                name="user_id"
                                                className="form-control"
                                                placeholder="Nhập người mượn"
                                                value={user ? user.name : ''}
                                                readOnly
                                            />

                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="created_at">Ngày tạo phiếu</label>
                                            <Field
                                                type="datetime-local" // Sử dụng datetime-local để hiển thị cả ngày và giờ
                                                name="created_at"
                                                className="form-control"
                                                placeholder="Nhập ngày tạo phiếu"
                                                value={createdAt}
                                                onChange={(e) => setCreatedAt(e.target.value)}
                                            />
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
                                            {errors.borrow_date && touched.borrow_date ? (
                                                <div className="text-danger">{errors.borrow_date}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="borrow_note">Ghi chú</label>
                                    <textarea
                                        name="borrow_note"
                                        className="form-control"
                                        placeholder="Nhập ghi chú"
                                    />
                                    {errors.borrow_note && touched.borrow_note ? (
                                        <div className="text-danger">{errors.borrow_note}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active " href="{{ route('devices.index') }}">
                                                Chi tiết phiếu mượn
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col"></div>
                                    </div>

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

                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={item.device_id}>
                                                        <td>{index + 1}</td>
                                                        <td className="device-cell">
                                                            <div className="device-info">
                                                                <Link to={`/borrows/${item.device_id}`} className="tile tile-img mr-1">
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={item.device && item.device.image ? imageBaseUrl + item.device.image : ''}
                                                                        alt={item.name}
                                                                    />
                                                                </Link>
                                                                <span>{item.device ? item.device.name : 'Tên không tồn tại'}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="quantity-control">
                                                                <button onClick={() => handleDecreaseQuantity(index)} className="quantity-btn">-</button>
                                                                <span className="quantity-text">{item.quantity}</span>
                                                                <button onClick={() => handleIncreaseQuantity(index)} className="quantity-btn">+</button>
                                                            </div>
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



                                                        <td className="align-middle" width="100px">
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <button onClick={() => handleRemove(index)} className="btn btn-sm btn-icon btn-secondary">
                                                                    <FontAwesomeIcon icon={faTrash} /> {/* Replace the text "Xóa" with the trash icon */}
                                                                </button>
                                                            </div>
                                                        </td>


                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary ml-auto float-right">
                                            Tạo phiếu mượn
                                        </button>
                                        <button
                                            onClick={() => navigate('/devices')}
                                            className="btn btn-secondary"
                                        >
                                            Quay lại
                                        </button>
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

export default Cart;
