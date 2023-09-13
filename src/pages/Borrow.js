import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import BorrowModel from '../models/BorrowModel';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../includes/Breadcrumb';
import Pagination from '../includes/elements/Pagination';

function Borrow(props) {
    const navigate = useNavigate();
    const [borrows, setBorrows] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    // Phan trang
    const [page,setPage] = useState(1);
    const [pageData,setPageData] = useState({});
    // Search
    const [filter,setFilter] = useState({ is_active: 1 });
    
    if (user === null){
        navigate('/login')
    }

    useEffect(() => {
        BorrowModel.getAllBorrows({
            page: page,
            filter: filter
        }).then( res => {
            setBorrows(res.data);
            // Phan trang
            const meta = {
                last_page: res.last_page,
                total: res.total,
                from: res.from,
                to: res.to,
                current_page : res.current_page
            }
            setPageData(meta);
        }).catch( err => {
            console.error('Error fetching data:', err);
        })
    }, [page,filter]);

    const handleChangeFilter = (event) => {
        setPage(1);
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }
    return (
        <LayoutMaster>
            <Breadcrumb page_title="Danh sách thiết bị"/>

            <div className="page-section">
                <div className="card card-fluid">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col">
                                <form action="{{ route('devices.index') }}" method="GET" id="form-search" onChange={handleChangeFilter}>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                name="searchBorrowDate"
                                                className="form-control"
                                                type="date"
                                                placeholder="Tìm theo ngày mượn từ..."
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                name="searchBorrowDate_to"
                                                className="form-control"
                                                type="date"
                                                placeholder="Tìm theo ngày mượn đến..."
                                            />
                                        </div>
                                        <div className="col">
                                            <select
                                                name="searchStatus"
                                                className="form-control"
                                            >
                                                <option value="">-- Chọn tình trạng --</option>
                                                <option value="Đã trả">Đã trả</option>
                                                <option value="Chưa trả">Chưa trả</option>
                                            </select>
                                        </div>

                                        <div className="col">
                                            <select
                                                name="searchApproved"
                                                className="form-control"
                                            >
                                                <option value="">-- Chọn xét duyệt --</option>
                                                <option value="Đã duyệt">Đã duyệt</option>
                                                <option value="Chưa duyệt">Chưa duyệt</option>
                                                <option value="Từ chối">Từ chối</option>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {borrows.map((borrow, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{borrow.created_date}</td>
                                            <td>{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                                            <td>
                                                {borrow.status ? 'Đã trả' : 'Chưa trả'} ({borrow.tong_tra}/{borrow.tong_muon})
                                            </td>                                                <td>{borrow.approved === '2' ? 'Từ chối' : (borrow.approved === '1' ? 'Đã duyệt' : 'Chưa duyệt')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination pageData={pageData} setPage={setPage}/>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
    
}
export default Borrow;
