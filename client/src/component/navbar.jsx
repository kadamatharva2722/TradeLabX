import React from "react";
import style from './navbar.module.css';

function Navbar(){

    return(
        <div className={style.navbar}>
            <div className={style.logo}>
                <h2>TradeLabX</h2>
            </div>
                <ul className={style.optionEdit}>
                    <li>Help</li>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
        </div>
    )
}
export default Navbar;
