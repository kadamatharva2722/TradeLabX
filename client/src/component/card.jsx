import style from'./card.module.css';

function CardDiv() {
    return (
        <div className={style.alignCard}>
            <div className={style.officialCard}>
            <div className={style.ccard}><p className={style.headerofcard}>Trade Entry</p>
            <p className={style.content}>Record trades including dates, pairs, setups and results</p>
            </div>
            <div className={style.ccard}><p className={style.headerofcard}>Performance Tracking</p>
            <p className={style.content}>Analyze trading statistics, win rates, profit/loss</p></div>
            <div className={style.ccard}><p className={style.headerofcard}>Risk Management</p>
            <p className={style.content}>Monitor risk throuch risk by position sizes and outcomes</p></div>
            <div className={style.ccard}><p className={style.headerofcard}>Insights & Analytics</p>
            <p className={style.content}>Improve our strategies with detailed reports and data visualiz</p></div>
            </div>
        </div>
    )
}
export default CardDiv;
