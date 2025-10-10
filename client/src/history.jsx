import React, { useEffect, useState } from "react";
import style from './history.module.css';
import NavbarForDash from "./component/navbarForDash";
import axios from "axios";
import * as Widgets from './component/TradingViewMiniChart'; // import all TradingView components

export default function History() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [tradeData, setTradeData] = useState([]);
    const [assets, setAssets] = useState('');
    const [strategy, setStrategy] = useState('');
    const [profitt, setProfitt] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState(null);

    const assetWidgetMap = {
        BTC: Widgets.Btc,
        ETH: Widgets.Eth,
        Nifty: Widgets.Nifty,
        BankNifty: Widgets.BankNifty,
        Gold: Widgets.Gold,
        BHEL: Widgets.Bhel,
        CrudeOil: Widgets.CrudeOil,
        USDINR: Widgets.UsdInr,
        Nasdaq: Widgets.Nasdaq
    };

    async function fetchTradeData() {
        const res = await axios.get(`https://trade-lab-x-server.vercel.app/trade/getTradeData/${user._id}`);
        const { tradeData } = res.data;
        setTradeData(tradeData);
        calculateProfit(tradeData);
    }

    async function submitFilter(e) {
        e.preventDefault();
        const res = await axios.get('https://trade-lab-x-server.vercel.app/trade/getFilterTrade', {
            params: {
                user: user._id,
                assets: assets,
                strategy: strategy,
            }
        })
        const tradeData = res.data.filterData;
        setTradeData(tradeData);
        calculateProfit(tradeData);
    }

    function reset() {
        window.location.reload();
    }

    function calculateProfit(data) {
        let total = 0;
        data.forEach((trade) => {
            total += (Number(trade.exit) - Number(trade.entry)) * Number(trade.qty);
        });
        setProfitt(total);
    }

    function openModal(trade) {
        setSelectedTrade(trade);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setSelectedTrade(null);
    }

    useEffect(() => {
        fetchTradeData();
    }, [])

    const SelectedWidget = selectedTrade ? assetWidgetMap[selectedTrade.symbol] : null;

    return (
        <div className={style.historyPage}>
            <NavbarForDash />

            <nav className={style.navbar}>
                <h1>Trade History</h1>
            </nav>

            <div className={style.summaryCards}>
                <div className={style.card}>Total Trades:
                    <h1>{tradeData.length}</h1></div>
                <div className={style.card}>Win Rate:
                    <h1>68%</h1></div>
                <div className={style.card}>Net P/L:
                    <h1 style={{color: profitt<0 ? 'red':'green'}}>${profitt}</h1></div>
            </div>

            <div className={style.filterBar}>
                <form onSubmit={submitFilter}>
                    <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
                        <option value="">All Strategies</option>
                        <option value="Breakout">Breakout</option>
                        <option value="Support">Support</option>
                        <option value="Resistance">Resistance</option>
                        <option value="SMCPattern">SMC Pattern</option>
                        <option value="Supply">Supply Zone</option>
                        <option value="Demand">Demand Zone</option>
                        <option value="CandlePattern">CandleStick Pattern</option>
                        <option value="EMASMA">EMA/SMA</option>
                        <option value="VolumePriceAction">Volume+Price Action</option>
                    </select>
                    <select value={assets} onChange={(e) => setAssets(e.target.value)}>
                        <option value="">All Assets</option>
                        <option value="Nifty">Nifty</option>
                        <option value="Gold">Gold</option>
                        <option value="BHEL">BHEL</option>
                        <option value="BankNifty">Bank Nifty</option>
                        <option value="CrudeOil">Crude Oil</option>
                        <option value="USDINR">USD/INR</option>
                        <option value="ETH">ETH (Ethereum)</option>
                        <option value="BTC">BTC (Bitcoin)</option>
                        <option value="Nasdaq">Nasdaq</option>
                    </select>
                    <button type="submit" className={style.findButton}>Find</button>
                    <button type="button" className={style.findButton} onClick={reset}>Reset</button>
                </form>
            </div>

            <div className={style.tableOHistory}>
                <table className={style.tradeTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Asset</th>
                            <th>Strategy</th>
                            <th>Amount</th>
                            <th>P/L</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradeData.map((trade, idx) => (
                            <tr key={idx} onClick={() => openModal(trade)} style={{ cursor: 'pointer' }}>
                                <td>{idx + 1}</td>
                                <td>{trade.symbol}</td>
                                <td>{trade.strategy}</td>
                                <td>${Number(trade.entry) * Number(trade.qty)}</td>
                                <td className={(Number(trade.exit) - Number(trade.entry)) * Number(trade.qty) >= 0 ? style.profitRow : style.lossRow}>
                                    ${(Number(trade.exit) - Number(trade.entry)) * Number(trade.qty)}
                                </td>
                                <td>{trade.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Popup */}
            {showModal && selectedTrade && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2>Trade Details</h2>
                        <div className={style.info}><div className={style.infoParts}>
                            <p><strong>Asset:</strong> {selectedTrade.symbol}</p>
                            <p><strong>Strategy:</strong> {selectedTrade.strategy}</p>
                            <p><strong>Qty:</strong> {selectedTrade.qty}</p>
                            </div>
                            <div className={style.infoParts}>
                            <p><strong>Entry:</strong> {selectedTrade.entry}</p>
                            <p><strong>Exit:</strong> {selectedTrade.exit}</p>
                            <p><strong>P/L:</strong> ${(Number(selectedTrade.exit) - Number(selectedTrade.entry)) * Number(selectedTrade.qty)}</p>
                        </div>
                        <div className={style.infoParts} style={{flexWrap:'wrap'}}><p><strong>Reason:</strong>{selectedTrade.textArea}</p></div>
                        </div>
                        <h3 style={{margin:'20px', paddingTop:'10px', color:'gray'}}>Live Chart of {selectedTrade.symbol}</h3>
                        {SelectedWidget ? <SelectedWidget /> : <p>No chart available</p>}

                        <button onClick={closeModal} className={style.closeButton}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
