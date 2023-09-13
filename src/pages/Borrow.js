import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import BorrowModel from '../models/BorrowModel';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import arrow icons

function Borrow(props) {
    const navigate = useNavigate();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
    const [borrows, setBorrows] = useState([]);
    const [searchCreatedDate, setSearchCreatedDate] = useState('');
    const [searchBorrowDate, setSearchBorrowDate] = useState('');
    const [searchBorrowDate_to, setSearchBorrowDate_to] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [searchApproved, setSearchApproved] = useState('');
    const [totalReturned, setTotalReturned] = useState(0);
    const [totalBorrowed, setTotalBorrowed] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const borrowModel = new BorrowModel();
        async function fetchData() {
            try {
                const data = await borrowModel.getAllBorrows();
                setBorrows(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    if (acc1 !== null) {
        // Chuyển đổi ngày tháng sang định dạng dễ đọc
        function formatDateString(dateString) {
            const formattedDate = format(new Date(dateString), "HH:mm:ss dd/MM/yyyy");
            return formattedDate;
        }

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
                        <h1 className="page-title mr-sm-auto"> Danh Sách Phiếu Mượn</h1>
                    </div>
                </header>

                <div className="page-section">
                    <div className="card card-fluid">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active " to="/borrows">
                                        Tất Cả
                                    </Link>
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
                                                    name="searchBorrowDate"
                                                    className="form-control"
                                                    type="date"
                                                    placeholder="Tìm theo ngày mượn từ..."
                                                    value={searchBorrowDate}
                                                    onChange={(e) => setSearchBorrowDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    name="searchBorrowDate_to"
                                                    className="form-control"
                                                    type="date"
                                                    placeholder="Tìm theo ngày mượn đến..."
                                                    value={searchBorrowDate_to}
                                                    onChange={(e) => setSearchBorrowDate_to(e.target.value)}
                                                />
                                            </div>
                                            <div className="col">
                                                <select
                                                    name="searchStatus"
                                                    className="form-control"
                                                    value={searchStatus}
                                                    onChange={(e) => setSearchStatus(e.target.value)}
                                                >
                                                    <option value="">-- Chọn tình trạng --</option>
                                                    <option value="1">Đã trả</option>
                                                    <option value="0">Chưa trả</option>
                                                </select>
                                            </div>

                                            <div className="col">
                                                <select
                                                    name="searchApproved"
                                                    className="form-control"
                                                    value={searchApproved}
                                                    onChange={(e) => setSearchApproved(e.target.value)}
                                                >
                                                    <option value="">-- Chọn xét duyệt --</option>
                                                    <option value="1">Đã duyệt</option>
                                                    <option value="0">Chưa duyệt</option>
                                                    <option value="2">Từ chối</option>
                                                </select>
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
                                            <th>Người dùng</th>
                                            <th>Ngày tạo phiếu</th>
                                            <th>Ngày mượn</th>
                                            <th>Tình trạng</th>
                                            <th>Xét duyệt</th>
                                            <th>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrows.map((borrow, index) => (
                                            borrow.user_id === user.id && (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.name}</td>
                                                    <td>{formatDateString(borrow.created_at)}</td>
                                                    <td>{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                                                    <td>{borrow.status ? 'Đã trả' : 'Chưa trả'} ({borrow.tong_tra}/{borrow.tong_muon})</td>
                                                    <td>{borrow.approved === '2' ? 'Từ chối' : (borrow.approved === '1' ? 'Đã duyệt' : 'Chưa duyệt')}</td>
                                                    <td>
                                                        {borrow.approved !== '1' && (
                                                            <>
                                                                <Link
                                                                    to={`/borrows/${borrow.id}/edit`}
                                                                    className="btn btn-sm btn-icon btn-secondary"
                                                                >
                                                                    <i className="fa fa-pencil-alt"></i>
                                                                </Link>
                                                                <button
                                                                    // onClick={() => handleDelete(borrow.id)}
                                                                    className="btn btn-sm btn-icon btn-secondary"
                                                                >
                                                                    <i className="far fa-trash-alt"></i>
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </LayoutMaster>
        );
    } else {
        navigate('/login')
    }
}
export default Borrow;
