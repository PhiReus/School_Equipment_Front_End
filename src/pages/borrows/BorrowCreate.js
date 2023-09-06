import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import BorrowModel from '../../models/BorrowModel';
import LayoutMaster from '../../layouts/LayoutMaster';

const SignupSchema = Yup.object().shape({
    user_id: Yup.string().required('Required'),
    borrow_date: Yup.string()
        .required("Required"),
});

function BorrowCreate(props) {
    const navigate = useNavigate();
    const handleSubmit = (data) => {
        BorrowModel.store(data)
            .then(() => {
                // Hiển thị thông báo thành công bằng SweetAlert2
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm thành công!',
                    showConfirmButton: false,
                    timer: 2000 // Thời gian hiển thị thông báo (2 giây)
                });

                // Chuyển hướng về trang "Bôklis" sau khi thêm thành công
                navigate('/borrows');
            })
            .catch((error) => {
                console.error('Error creating book:', error.message);
            });
    };
    return (
        <LayoutMaster>
                  <header className="page-title-bar">
                  <h1 className="page-title"> Thêm phiếu mượn </h1>
                  </header>
       
                  <Formik
                initialValues={{
                    user_id: '',
                    borrow_date: '',
                    created_at: '',
                    status: '',
                    approved: '',
                    borrow_note: '',
                }}

                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                  {({ errors, touched }) => (
               <Form>
               <div className="card">
                   <div className="card-body">
                       <legend>Thông tin cơ bản</legend>
                       <div className="form-group">
                           <label htmlFor="user_id">Tên giáo viên</label>{" "}
                           <Field
                               type="text"
                               name="user_id"
                               className="form-control"
                               placeholder="Nhập tên giáo viên"
                           />
                           {errors.user_id && touched.user_id ? (
                               <div className="text-danger">{errors.user_id}</div>
                           ) : null}
                       </div>
           
                       <div className="form-group">
                           <label htmlFor="borrow_date">Ngày mượn</label>{" "}
                           <Field
                               type="text"
                               name="borrow_date"
                               className="form-control"
                               placeholder="Nhập ngày mượn"
                           />
                           {errors.borrow_date && touched.borrow_date ? (
                               <div className="text-danger">{errors.borrow_date}</div>
                           ) : null}
                       </div>
           
                       <div className="form-group">
                           <label htmlFor="created_at">Ngày tạo phiếu</label>{" "}
                           <Field
                               type="text"
                               name="created_at"
                               className="form-control"
                               placeholder="Nhập ngày tạo phiếu"
                           />
                           {errors.created_at && touched.created_at ? (
                               <div className="text-danger">{errors.created_at}</div>
                           ) : null}
                       </div>
           
                       <div className="form-group">
                           <label htmlFor="status">Tình trạng</label>{" "}
                           <Field
                               type="text"
                               name="status"
                               className="form-control"
                               placeholder="Nhập tình trạng"
                           />
                           {errors.status && touched.status ? (
                               <div className="text-danger">{errors.status}</div>
                           ) : null}
                       </div>
           
                       <div className="form-group">
                           <label htmlFor="approved">Trạng thái xét duyệt</label>{" "}
                           <Field
                               type="text"
                               name="approved"
                               className="form-control"
                               placeholder="Nhập trạng thái xét duyệt"
                           />
                           {errors.approved && touched.approved ? (
                               <div className="text-danger">{errors.approved}</div>
                           ) : null}
                       </div>
           
                       <div className="form-group">
                           <label htmlFor="borrow_note">Ghi chú</label>{" "}
                           <Field
                               type="text"
                               name="borrow_note"
                               className="form-control"
                               placeholder="Nhập ghi chú"
                           />
                           {errors.borrow_note && touched.borrow_note ? (
                               <div className="text-danger">{errors.borrow_note}</div>
                           ) : null}
                       </div>
                       <div className="form-group">
                            <button type="submit" className="btn btn-primary ml-auto">Lưu</button>
                            <button onClick={() => navigate('/borrows')} className="btn btn-secondary float-right">Hủy</button>
                        </div>
                   </div>
               </div>
           </Form>
           
                )}
            </Formik>
        </LayoutMaster>
    );
}

export default BorrowCreate;