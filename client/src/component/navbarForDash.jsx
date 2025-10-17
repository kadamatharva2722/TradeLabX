import React from "react";
import style from './navbarForDash.module.css';
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import TradingViewWidget from "../tradingview";


function NavbarForDash() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const displayImage = profileImg instanceof File
    ? URL.createObjectURL(profileImg) // preview newly selected file
    : user.profileImg === 'assets/Profile.png'
      ? 'https://trade-lab-x-server.vercel.app/assets/Profile.png' // default local image
      : user.profileImg;

    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                <h2>TradeLabX</h2>
            </div>
            <div className={style.tradingview}>
                <TradingViewWidget />
            </div>
            <ul className={style.optionEdit}>
                <li><Link to={'/dashboard'} className={style.link}>Home</Link></li>
                <li><Link to={'/history'} className={style.link}>History</Link></li>
                <li className={style.logout}><button onClick={() => navigate('/login')}>Logout</button></li>
                <li><button className={style.profileButton}><Link to='/userProfile'><img src={displayImage} alt="" /></Link></button></li>
            </ul>
        </div>
    )
}
export default NavbarForDash;
