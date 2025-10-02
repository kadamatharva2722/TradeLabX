import React, { useEffect, useState } from "react";
import stylee from './dashboard.module.css';
import NavbarForDash from "./component/navbarForDash";
import CardForDash from "./component/cardForDash";
import RecentTab from "./component/recentTab";
import Pie from "./component/pieChart";
import PopUpForDashForm from "./component/popUpFormForDash";
import MarketData from "./component/MarketData";
import { useLocation } from "react-router";
import { Outlet } from 'react-router'
import axios from "axios";
import ForexCrossRate from "./component/ForexCrossRate";


function DashBoard() {
    const location = useLocation();
    const [tradeData, setTradeData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(10000);
    const [profit, setProfit] = useState(0)
    const [strategyArray, setStrategyArray] = useState([]);
    const [winRate, setWinRate] = useState(0);
    let styleFP;

    const user = JSON.parse(localStorage.getItem("user"));

    async function fetchTradesData() {
        const res = await axios.get(`http://localhost:3000/trade/getTradeData/${user._id}`);
        const { tradeData, userFind } = res.data;
        const arr = tradeData.map((trade, idx) => ({ id: idx, strategy: trade.strategy }));
        setStrategyArray(arr);
        setTradeData(tradeData);
        setTotalAmount(userFind.amount);
        setProfit(userFind.profit);

        const wins = tradeData.filter(trade => (Number(trade.exit)-Number(trade.entry))*Number(trade.qty) > 0).length;
        const total = tradeData.length;

        const ratewin = ((wins / total) * 100).toFixed(2); // returns percentage
        setWinRate(ratewin);
    }

    useEffect(() => {
        //const storedAmount = Number(localStorage.getItem(`totalAmount_${user._id}`)) || 10000;
        //const storedProfit = Number(localStorage.getItem(`profit_${user._id}`)) || 0;
        fetchTradesData();
    }, [])

    return (
        <div className={stylee.bodyForDashboard}>
            <NavbarForDash user={user} />
            <div className={stylee.mainHeadingForDash}>
                <h1 className={stylee.headingOfDash}>Welcome back, {user ? user.name : Trader}!</h1>
                <PopUpForDashForm totalAmount={totalAmount} profit={profit} setTotalAmount={setTotalAmount} setProfit={setProfit} />
            </div>
            <div className={stylee.cardDisplay}>
                <CardForDash mainheading={"Total portfolio"} dollar="$" result={totalAmount} about={"+33% growth this month"} />
                <CardForDash mainheading={"Net P/L"} dollar="$" styleForProfit={profit < 0 ? styleFP = 'red' : styleFP = 'green'} result={profit} about={"-5% decline today"} />
                <CardForDash mainheading={"Win rate"} dollar="" result={winRate + "%"} about={"+15% growth over month"} />
            </div>
            <div className={stylee.userTradeDeatils}>
                <RecentTab tradeData={tradeData} />
                <Pie tradeData={strategyArray} />
            </div>
            <div className={stylee.tvbg}>
                <div className={stylee.tvcharts}>
                    <div className={stylee.tvchartsComp}>
                        <h3>See Current Market Data Live</h3>
                        <MarketData />
                    </div>
                    <div className={stylee.tvchartsComp}>
                        <h3>Forex Cross Rate</h3>
                        <ForexCrossRate />
                        <p className={stylee.forexText}>Note: Forex cross rates represent the
                            value of one currency compared to another, excluding the U.S. dollar as the base.
                            These rates are updated live and may vary depending on market liquidity and trading
                            sessions. Use them to quickly compare strengths of major global currencies.</p>
                    </div></div>
            </div>
            <Outlet />
        </div>
    )
}

export default DashBoard;
