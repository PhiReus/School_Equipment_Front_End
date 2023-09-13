import React from "react";
import { Link } from "react-router-dom";
function Sidebar(props) {
	return (
		<>
			<div className="aside-menu overflow-hidden">
				<nav id="stacked-menu" className="stacked-menu">
					<ul className="menu">
						<li className="menu-header">Thiết Bị</li>

						<li className="menu-item">
							<Link to={'/'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Thiết Bị</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/borrows'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Phiếu Mượn</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/cart'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Giỏ Mượn</span>
							</Link>
						</li>

						<li className="menu-header">Tài Khoản</li>

						<li className="menu-item">
							<Link to={'/users/profile'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Tài Khoản</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/users/update-profile'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Cập Nhật Tài Khoản</span>
							</Link>
						</li>

						<li className="menu-item">
							<Link to={'/users/logout'} className="menu-link">
								<span className="menu-icon"><i className="fas fa-book"></i></span>
								<span className="menu-text">Thoát</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}

export default Sidebar;
