import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import DeviceModel from '../models/DeviceModel';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        const deviceModel = new DeviceModel();
        const deviceTypeModel = new DeviceTypeModel();

        async function fetchData() {
            try {
                const deviceData = await deviceModel.getAllDevices();
                const deviceTypeData = await deviceTypeModel.getDeviceType();

                const devicesWithTypes = deviceData.map((device) => ({
                    ...device,
                    device_type: deviceTypeData.find((type) => type.id === device.device_type_id),
                }));

                setDevices(devicesWithTypes);
                setDeviceTypes(deviceTypeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

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

    // Filter devices based on the search input
    const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchQuantity === '' || device.quantity.toString().includes(searchQuantity)) &&
    (searchDeviceType === '' || device.device_type.name.toLowerCase().includes(searchDeviceType.toLowerCase()))
);
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
                                <Link className="nav-link active" to="/devices">
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
                                            <input
                                                name="searchQuantity"
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm theo số lượng..."
                                                value={searchQuantity}
                                                onChange={(e) => setSearchQuantity(e.target.value)}
                                            />
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
                                    {filteredDevices.map((device, index) => (
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
                                            <td>{device.device_type.name}</td>
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
