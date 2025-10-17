import React from "react";
import style from './navbarForDash.module.css';
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import TradingViewWidget from "../tradingview";


function NavbarForDash() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const profileUrl = user.profileImg
    ? `https://trade-lab-x-server.vercel.app${user.profileImg}?t=${Date.now()}` // force refresh
    : '/default-profile.png';

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
                <li><button className={style.profileButton}><Link to='/userProfile'><img src={profileUrl} alt="" /></Link></button></li>
            </ul>
        </div>
    )
}
export default NavbarForDash;
