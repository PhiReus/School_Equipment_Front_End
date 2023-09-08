import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import DeviceModel from '../models/DeviceModel';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CART } from '../redux/action';
import Swal from 'sweetalert2';


const imageBaseUrl = 'http://127.0.0.1:8000'; // Đường dẫn cơ sở cho ảnh

function DeviceList(props) {
    const [devices, setDevices] = useState([]);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        const deviceModel = new DeviceModel();
        async function fetchData() {
            try {
                const data = await deviceModel.getAllDevices();
                setDevices(data); // Lưu danh sách thiết bị vào state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const handleAddToCart = (device) => {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = cart.findIndex(item => item.device_id === device.id);

        if (existingItemIndex !== -1) {
            // Sản phẩm đã có trong giỏ hàng, cộng thêm số lượng
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity++;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            dispatch({ type: SET_CART, payload: updatedCart });
        } else {
            // Sản phẩm chưa có trong giỏ hàng, thêm mới
            const item = {
                device_id: device.id,
                quantity: 1, // Số lượng mặc định là 1, bạn có thể thay đổi nếu cần
                device: device,
            };

            const updatedCart = [...cart, item];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            dispatch({ type: SET_CART, payload: updatedCart });
        }

        // Hiển thị thông báo sử dụng sweetalert2
        Swal.fire({
            icon: 'success',
            title: 'Thiết bị đã được thêm vào phiếu mượn',
            showConfirmButton: false,
            timer: 1500, // Thời gian hiển thị thông báo (ms)
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
                <div className="d-md-flex align-items-md-start">
                    <h1 className="page-title mr-sm-auto"> Danh Sách Thiết Bị</h1>
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên thiết bị</th>
                                        <th>Số lượng</th>
                                        <th>Loại thiết bị</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices.map((device, index) => (
                                        <tr key={device.id}>
                                            <td>{index + 1}</td>
                                            <td className="device-cell">
                                                <div className="device-info">
                                                    <Link to={`/borrows/${device.id}`} className="tile tile-img mr-1">
                                                        <img
                                                            className="img-fluid"
                                                            src={imageBaseUrl + device.image}
                                                            alt={device.name}
                                                        />
                                                    </Link>
                                                    <span>{device.name}</span>
                                                </div>
                                            </td>

                                            <td>{device.quantity}</td>
                                            <td>{device.device_type_id}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleAddToCart(device)}
                                                    className="btn btn-success"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>
                            <Link to="/cart" className="btn btn-primary float-right">
                                Xem Giỏ Mượn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
}

export default DeviceList;
