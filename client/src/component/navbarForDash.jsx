import React from "react";
import style from './navbarForDash.module.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import TradingViewWidget from "../tradingview";

function NavbarForDash() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Safe check — handle missing user
  if (!user) {
    navigate('/login');
    return null;
  }

  // Determine profile image to display
  const displayImage =
    user.profileImg === 'assets/Profile.png'
      ? 'https://trade-lab-x-server.vercel.app/assets/Profile.png' // default image
      : user.profileImg; // Cloudinary link

  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <h2>TradeLabX</h2>
      </div>
      <div className={style.tradingview}>
        <TradingViewWidget />
      </div>
      <ul className={style.optionEdit}>
        <li><Link to="/dashboard" className={style.link}>Home</Link></li>
        <li><Link to="/history" className={style.link}>History</Link></li>
        <li className={style.logout}>
          <button onClick={() => {
            localStorage.removeItem("user");
            navigate('/login');
          }}>Logout</button>
        </li>
        <li>
          <button className={style.profileButton}>
            <Link to="/userProfile">
              <img
                src={displayImage || 'https://trade-lab-x-server.vercel.app/assets/Profile.png'}
                alt="Profile"
              />
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavbarForDash;
