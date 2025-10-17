import { useState } from 'react'
import style from './popUpForDash.module.css'
import Closebtn from '../assets/close.png';
import axios from 'axios';


export default function PopUpForDashForm({ setTotalAmount, setProfit, totalAmount, profit }) {

  const [isOpen, setIsOpen] = useState(false);

  const [strategy, setStrategy] = useState('Breakout');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [symbol, setSymbol] = useState('Nifty');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');
  const [textarea, setTextarea] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

async function submitForm(e) {
  e.preventDefault();

  try {
    const res = await axios.post(
      'https://trade-lab-x-server.vercel.app/trade/formData',
      {
        symbol,
        entry: Number(entry),
        exit: Number(exit),
        strategy,
        qty: Number(qty),
        date,
        textArea: textarea,
        insertedBy: user._id,
      }
    );

    const { userUpdate } = res.data || {};
    if (!userUpdate) {
      console.error("Unexpected response", res.data);
      return;
    }

    setTotalAmount(userUpdate.amount);
    setProfit(userUpdate.profit);

    // Close popup safely after success
    setIsOpen(false);
  } catch (err) {
    console.error("Error submitting form:", err);
  }
  window.location.reload();
}


  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>New Entry +</button>
      {
        isOpen ?
          <div className={style.popupBg}>
            <div className={style.popup}>
              <div className={style.top}>
                <h1>Enter Deatils</h1>
                <button onClick={() => setIsOpen(!isOpen)} className={style.closeBut}><img src={Closebtn} width={14} height={14} className={style.img1} /></button>
              </div>
              <div className={style.popupForm}>
                <div className={style.popupform1}>

                  <form onSubmit={submitForm}>

                    <label htmlFor="symbol">Symbol</label>
                    <select name="symbol" id="" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
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

                    <div className={style.EntryExit}>
                      <label htmlFor="entry">Entry</label>
                      <input type="number" name="entry" className={style.EntryExitInp} onChange={(e) => setEntry(e.target.value)} />

                      <label htmlFor="exit">Exit</label>
                      <input type="number" name='exit' className={style.EntryExitInp} onChange={(e) => setExit(e.target.value)} />
                    </div>

                    <label htmlFor="strategy">Strategy</label>
                    <select name="strategy" value={strategy} id="" onChange={(e) => setStrategy(e.target.value)}>
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

                    <label htmlFor="qty">Quantity</label>
                    <input type="number" name="qty" id="" className={style.qty} onChange={(e) => setQty(e.target.value)} />

                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="" onChange={(e) => setDate(e.target.value)} />

                    <label htmlFor="">Reason for Trade action? Enter Here</label>
                    <textarea
                      className={style.ttextarea}
                       onChange={(e) => setTextarea(e.target.value)}
                      ></textarea>

                    <button type='submit' className={style.sunmitBtn}>Submit</button>
                  </form>
                </div>


              </div>
            </div>
          </div>

          : null
      }
    </>
  )
}


