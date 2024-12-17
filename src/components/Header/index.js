import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const removeJwt = () => {
        Cookies.remove('jwt_token');
        navigate('/login');
    };

    return (
        <div className="nav-bar">
            <Link to="/">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                    className="logo"
                    alt="Logo"
                />
            </Link>
            <div className="menu-icon" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>
            <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    <li className="menu-item">Home</li>
                </Link>
                <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                    <li className="menu-item">Jobs</li>
                </Link>
                <li className="menu-item">
                    <button className="logout" onClick={removeJwt}>Log out</button>
                </li>
            </ul>
        </div>
    );
}

export default Header;
