import style from './recentTab.module.css';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Pie({ tradeData = [] }) {

    console.log(tradeData)
    const strategyCounts = tradeData.reduce((acc, trade) => {
        acc[trade.strategy] = (acc[trade.strategy] || 0) + 1;
        return acc;
    }, {});
    console.log(strategyCounts);

    const pieData = Object.entries(strategyCounts).map(([strategy, count], index) => ({
        id: index,
        value: count,
        label: strategy
    }));
    console.log(pieData)
    return (

        <div className={style.pieChartBg}>
            <h2>Strategy Pie Chart</h2>
            <PieChart
                series={[{ data: pieData }]}
                width={280}
                height={280}
                style={{ margin: '10px' }}
                colors={[
                    '#FF6384', // Breakout
                    '#36A2EB', // Support
                    '#FFCE56', // Resistance
                    '#4BC0C0', // SMC Pattern
                    '#9966FF', // Supply Zone
                    '#FF9F40', // Demand Zone
                    '#C9CBCF', // CandleStick Pattern
                    '#8AFF33', // EMA/SMA
                    '#FF33F6', // Volume+Price Action
                    '#33FFF5', // extra if needed
                    '#FF6B6B', // extra if needed
                    '#6BFFB3', // extra if needed
                    '#B36BFF', // extra if needed
                    '#FFD633', // extra if needed
                ]}
                
            />
            <p><b>*Note:</b> This chart shows the percentage breakdown of trading strategies used this month</p>
        </div>
    )
}
