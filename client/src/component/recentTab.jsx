import style from './recentTab.module.css';

export default function RecentTab({ tradeData }) {

    function colored(text) {
        const ctext = text.toString();
        const color = ctext[0] == '-' ? 'red' : 'green';
        return <td style={{ color: color }}>${text}</td>
    }

    return (
        <div className={style.RecentTabCard}>
            <h3>Recent Trades</h3>
            <div className={style.recentTrades}>
                <table>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.39)' }}>
                            <th>Symbol</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>P/L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (tradeData && tradeData.length > 0) ?
                                tradeData.map((trade, index) => (
                                    <tr key={index}>
                                        <td>{trade.symbol}</td>
                                        <td>{trade.date}</td>
                                        <td>{trade.qty}</td>
                                        {colored((trade.exit - trade.entry)*trade.qty)}
                                    </tr>
                                ))
                                : <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        <div style={{ margin: '50px 0' }}><h2 style={{fontSize:'25px', fontWeight:'400', textDecoration:'underline', fontStyle: 'italic',     color:'rgba(255, 255, 255, 0.454)'}}>Add your Trades</h2></div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
