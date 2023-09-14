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
import Breadcrumb from '../includes/Breadcrumb';
import Pagination from '../includes/elements/Pagination';

function DeviceList(props) {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));

    // Phan trang
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState({});
    // Search
    const [filter, setFilter] = useState({});

    useEffect(() => {
        DeviceTypeModel.getDeviceType().then((res) => {
            setDeviceTypes(res);
        })
    }, []);


    useEffect(() => {
        DeviceModel.getAllDevices({
            page: page,
            filter: filter
        }).then(res => {
            setDevices(res.data);
            // Phan trang
            setPageData(res.meta);
        }).catch(err => {
            console.error('Error fetching data:', err);
        })
    }, [page, filter]);

    const handleChangeFilter = (event) => {
        console.log(event.target.value);
        setPage(1);
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }
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

        return (
            <LayoutMaster>
                <Breadcrumb page_title="Danh sách thiết bị" />

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
                                    <form action="{{ route('devices.index') }}" method="GET" id="form-search" onChange={handleChangeFilter}>
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
                                                <select
                                                    name="searchQuantity"
                                                    className="form-control"
                                                >
                                                    <option value="">Tất cả</option>
                                                    <option value="1">Thiết bị còn</option>
                                                    <option value="0">thiết bị đã hết</option>
                                                </select>
                                            </div>

                                            <div className="col">
                                                <select
                                                    name="device_type_id"
                                                    className="form-control"
                                                >
                                                    <option value="">Tất cả</option>
                                                    {deviceTypes.map((deviceType) => (
                                                        <option key={deviceType.id} value={deviceType.id}>
                                                            {deviceType.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                        <div className="tile tile-img mr-1">
                                                            <img
                                                                className="img-fluid"
                                                                src={device.url_image}
                                                                alt={device.name}
                                                            />
                                                        </div>
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
                        <Pagination pageData={pageData} setPage={setPage} />
                    </div>
                </div>
            </LayoutMaster>
        );
    } else {
        navigate('/login');
    }
}

export default DeviceList;
