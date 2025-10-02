
import React, { useEffect, useState } from "react";
import './signin.css';
import { useNavigate } from "react-router";
import { useUser } from "./component/UserContext";
import axios from 'axios';

function Login() {

    const quotes = ["The goal of a successful trader is to make the best trades. Money is secondary.", "An investment in knowledge pays the best interest.", "The four most dangerous words in investing are: ‘This time it’s different.", "Every once in a while, the market does something so stupid it takes your breath away."]
    const [idx, setIdx] = useState(0);
    const { setUser } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorDisp, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => {
            setIdx((idx) => { return idx == 3 ? 0 : idx + 1 });
        }, 4000)
    }, []);

    function submitForm(e) {
        e.preventDefault();

        axios.post('http://localhost:3000/login', { email, password })
            .then(res => {
                setError('');
                const userData = res.data.user;
                localStorage.setItem("user", JSON.stringify(userData));
                navigate('/dashboard')
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError('Something went wrong. Please try again.');
                }
            })

    }


    return (
        <div className='backgroundForSignLog'>
            <h1 className='h11'>TradeLabX</h1>
            <p className='pofheading'>- The Edge behind every trade -</p>
            <div className='boxForConnection'>
                <div className='boxForsignlog'>
                    <h3 className=''>Welcome back Trader!</h3>
                    <div className='form1'>

                        <form onSubmit={submitForm}>

                            <label htmlFor="email">Email</label><br />
                            <input type="email" name='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} /><br />

                            <label htmlFor="password">Password</label><br />
                            <input type="password" name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} /><br />

                            <button type='submit'>Login</button>

                        </form>
                        {ErrorDisp ? <p style={{ padding: '5px', color: 'rgb(225, 45, 45)', fontSize: '17px' }}>{ErrorDisp}</p> : null}

                    </div>
                    <p className='p2'>Don't have an account?</p>
                    <button className='buttonforLogin' onClick={() => navigate('/signin')} >Register</button>
                </div>
                <div className='boxForAd'>
                    <p>{quotes[idx]}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
