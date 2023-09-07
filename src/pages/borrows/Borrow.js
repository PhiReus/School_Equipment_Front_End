import React, { useEffect, useState } from 'react';
import LayoutMaster from '../../layouts/LayoutMaster';
import BorrowModel from '../../models/BorrowModel';
import { format } from 'date-fns'; // Nhập hàm format từ thư viện date-fns
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Borrow(props) {
    const [borrows, setBorrows] = useState([]);
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
    // Chuyển đổi ngày tháng sang định dạng dễ đọc
    function formatDateString(dateString) {
        const formattedDate = format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss'); // Định dạng theo ý muốn của bạn
        return formattedDate;
    }
    return (
        <LayoutMaster>
            <header className="page-title-bar">
                <h1 className="page-title"> Danh sách Phiếu mượn </h1>
                <div className="btn-toolbar">
                    <Link to="/borrows/create" className="btn btn-primary mr-2">
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="ml-1">Thêm Mới</span>
                    </Link>
                </div>

            </header>
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
                        borrow.user_id === user.id && (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{formatDateString(borrow.created_at)}</td>
                                <td>{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                                <td>{borrow.status ? 'Đã trả' : 'Chưa trả'}</td>
                                <td>{borrow.approved === '2' ? 'Từ chối' : (borrow.approved === '1' ? 'Đã duyệt' : 'Chưa duyệt')}</td>
                            </tr>
                        )
                    ))}

                </tbody>
            </table>

        </LayoutMaster>
    );
}
export default Borrow;
