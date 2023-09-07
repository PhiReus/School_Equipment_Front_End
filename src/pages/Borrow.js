import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Thêm import cho useDispatch
import { SET_CART } from '../redux/action';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; //
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const imageBaseUrl = 'http://127.0.0.1:8000'; // Đường dẫn cơ sở cho ảnh

function Borrow(props) {
    const [data, setData] = useState([]); // Thay thế dữ liệu cứng bằng dữ liệu từ localStorage
    const dispatch = useDispatch();
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setData(cartData);
    }, [data]); // Thêm [data] vào đây để cập nhật lại data khi data thay

    const handleUpdateCart = (index, quantity) => {
        const newCart = [...data];
        newCart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch({
            type: SET_CART,
            payload: newCart,
        });
    };
    const handleQuantityChange = (e) => {
        const id = e.target.id;
        const qty = e.target.value;
        const newCart = [...data];
        if (newCart[id]) {
            newCart[id].quantity = qty;
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch({
                type: SET_CART,
                payload: newCart,
            });
        }
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
                {/* <button type="button" class="btn btn-success btn-floated"><span class="fa fa-plus"></span></button> */}
                <div className="d-md-flex align-items-md-start">
                    <h1 className="page-title mr-sm-auto"> Phiếu Mượn</h1>
                </div>
            </header>
            <div className="page-section">
                <div className="card card-fluid">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link active " href="{{ route('devices.index') }}">
                                    Tất Cả
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col">
                                <form action="{{ route('devices.index') }}" method="GET" id="form-search">
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                name="searchName"
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm theo tên..."
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                name="searchName"
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm theo tên..."
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                name="searchName"
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm theo tên..."
                                            />
                                        </div>
                                        <div className="col-lg-2">
                                            <button className="btn btn-secondary" type="submit">
                                                Tìm Kiếm
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên thiết bị</th>
                                        <th>Số lượng</th>
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
                    </div>
                </div>
            </div>

        </LayoutMaster>
    );
}

export default Borrow;
