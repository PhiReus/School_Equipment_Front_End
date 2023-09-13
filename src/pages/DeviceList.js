import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import DeviceModel from '../models/DeviceModel';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CART } from '../redux/action';
import Swal from 'sweetalert2';
import DeviceTypeModel from '../models/DeviceTypeModel';

const imageBaseUrl = 'http://127.0.0.1:8000'; // Đường dẫn cơ sở cho ảnh

function DeviceList(props) {
    const [devices, setDevices] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [searchName, setSearchName] = useState(''); // State for search input
    const [searchQuantity, setSearchQuantity] = useState(''); // State for search input
    const [searchDeviceType, setSearchDeviceType] = useState('');
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        const deviceModel = new DeviceModel(); // Tạo thể hiện của DeviceModel
        deviceModel.getAllDevices().then((res) => {
            setDevices(res.data); // Đây sẽ là dữ liệu, không phải response object
        });
    }, []);
    console.log(devices);
    if (acc1 !== null) {


        const handleAddToCart = (device) => {
            const existingItemIndex = cart.findIndex(item => item.device_id === device.id);

            if (existingItemIndex !== -1) {
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity++;
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                dispatch({ type: SET_CART, payload: updatedCart });
            } else {
                const item = {
                    device_id: device.id,
                    quantity: 1,
                    device: device,
                };

                const updatedCart = [...cart, item];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                dispatch({ type: SET_CART, payload: updatedCart });
            }

            Swal.fire({
                icon: 'success',
                title: 'Thiết bị đã được thêm vào phiếu mượn',
                showConfirmButton: false,
                timer: 1500,
            });
        };

        // const filteredDevices = devices.filter((device) => {
        //     const isNameMatch = device.name.toLowerCase().includes(searchName.toLowerCase());
        
        //     if (searchQuantity === "") {
        //         return isNameMatch;
        //     } else if (searchQuantity === "1") {
        //         return isNameMatch && device.quantity > 0;
        //     } else if (searchQuantity === "0") {
        //         return isNameMatch && device.quantity === 0;
        //     }
        
        //     if (searchDeviceType === "") {
        //         return isNameMatch;
        //     }
        
        //     return isNameMatch && device.devicetype.name.toLowerCase().includes(searchDeviceType.toLowerCase());
        // });
        return (
            <LayoutMaster>
                <header className="page-title-bar">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <Link to="/devices">
                                    <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                                    Trang Chủ
                                </Link>
                            </li>
                        </ol>
                    </nav>
                    <div className="d-md-flex align-items-md-start">
                        <h1 className="page-title mr-sm-auto">Danh Sách Thiết Bị</h1>
                    </div>
                </header>
                <div className="page-section">
                    <div className="card card-fluid">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        Tất Cả
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            // Call a function to handle search
                                        }}
                                        id="form-search"
                                    >
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    name="searchName"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Tìm theo tên..."
                                                    value={searchName}
                                                    onChange={(e) => setSearchName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col">
                                                <select
                                                    name="searchQuantity"
                                                    className="form-control"
                                                    value={searchQuantity}
                                                    onChange={(e) => setSearchQuantity(e.target.value)}
                                                >
                                                    <option value="">Tất cả</option>
                                                    <option value="1">Thiết bị còn</option>
                                                    <option value="0">thiết bị đã hết</option>
                                                </select>
                                            </div>

                                            <div className="col">
                                                <input
                                                    name="searchDeviceType"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Tìm theo loại thiết bị..."
                                                    value={searchDeviceType}
                                                    onChange={(e) => setSearchDeviceType(e.target.value)}
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
                                                                src={device.url_image}
                                                                alt={device.name}
                                                            />
                                                        </Link>
                                                        <span>{device.name}</span>
                                                    </div>
                                                </td>
                                                <td>{device.quantity}</td>
                                                <td>{device.devicetype.name}</td>

                                                <td>
                                                    {device.quantity > 0 && (
                                                        <button
                                                            onClick={() => handleAddToCart(device)}
                                                            className="btn btn-success btn-sm"
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    )}
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
    } else {
        navigate('/login');
    }
}

export default DeviceList;
