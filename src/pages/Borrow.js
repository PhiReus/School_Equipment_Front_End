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
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); // Number of items to display per page
    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    if (acc1 !== null){
    // Chuyển đổi ngày tháng sang định dạng dễ đọc
    function formatDateString(dateString) {
        const formattedDate = format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss'); // Định dạng theo ý muốn của bạn
        return formattedDate;
    }
  

    // Filter borrows based on search input
    const filteredBorrows = borrows.filter((borrow) => {
        const borrowDate = new Date(borrow.borrow_date);

        // Chuyển đổi ngày tìm kiếm thành đối tượng Date
        const fromDate = searchBorrowDate ? new Date(searchBorrowDate) : null;
        const toDate = searchBorrowDate_to ? new Date(searchBorrowDate_to) : null;

        // Kiểm tra nếu ngày mượn nằm trong khoảng thời gian từ fromDate đến toDate (bao gồm cả fromDate và toDate)
        const isDateInRange =
            (!fromDate || borrowDate >= fromDate) &&
            (!toDate || borrowDate <= toDate);

        return (
            borrow.user_id === user.id &&
            (searchCreatedDate === '' || borrow.created_at.includes(searchCreatedDate)) &&
            isDateInRange &&
            (searchStatus === '' || (borrow.status ? 'Đã trả' : 'Chưa trả').toLowerCase().includes(searchStatus.toLowerCase())) &&
            (searchApproved === '' || (borrow.approved === '2' ? 'Từ chối' : (borrow.approved === '1' ? 'Đã duyệt' : 'Chưa duyệt')).toLowerCase().includes(searchApproved.toLowerCase()))
        );
    });


    const totalPages = Math.ceil(filteredBorrows.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const currentItems = filteredBorrows.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

  
    
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
                                <form action="{{ route('devices.index') }}" method="GET" id="form-search" onSubmit={handleSearchSubmit}>
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
                                                <option value="Đã trả">Đã trả</option>
                                                <option value="Chưa trả">Chưa trả</option>
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
                                    {currentItems.map((borrow, index) => (
                                        borrow.user_id === user.id && (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{formatDateString(borrow.created_at)}</td>
                                                <td>{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                                                <td>
                                                    {borrow.status ? 'Đã trả' : 'Chưa trả'} ({borrow.tong_tra}/{borrow.tong_muon})
                                                </td>                                                <td>{borrow.approved === '2' ? 'Từ chối' : (borrow.approved === '1' ? 'Đã duyệt' : 'Chưa duyệt')}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination justify-content-end">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-start">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                            <FontAwesomeIcon icon={faChevronLeft} /> {/* Previous arrow icon */}
                                        </button>
                                    </li>
                                    {pageNumbers.map((pageNumber) => (
                                        <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                                                {pageNumber}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                            <FontAwesomeIcon icon={faChevronRight} /> {/* Next arrow icon */}
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
    }else {
        navigate('/login')
    }
}
export default Borrow;
