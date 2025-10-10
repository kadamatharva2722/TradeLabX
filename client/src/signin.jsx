

import React, { useEffect, useState } from "react";
import './signin.css';
import { useNavigate } from "react-router";
import axios from 'axios';

function Signin() {

    const quotes = ["The goal of a successful trader is to make the best trades. Money is secondary.", "An investment in knowledge pays the best interest.", "The four most dangerous words in investing are: ‘This time it’s different.", "Every once in a while, the market does something so stupid it takes your breath away."]
    const [idx, setIdx] = useState(0);
    const [name, setName] = useState('');
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

        const res = axios.post('trade-lab-x-server.vercel.app/register', { name, email, password })
            .then(res => {
                console.log(res);
                setError('');
                const resData = res.data;
                navigate('/login', { state: { suser: resData.user } });
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
                    <h3 className=''>Create Your Account</h3>
                    <div className='form1'>

                        <form onSubmit={submitForm}>
                            <label htmlFor="name">Name</label><br />
                            <input type="name" name='name' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} /><br />

                            <label htmlFor="email">Email</label><br />
                            <input type="email" name='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} /><br />

                            <label htmlFor="password">Password</label><br />
                            <input type="password" name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} /><br />

                            <button type='submit'>Register</button>

                        </form>
                        {ErrorDisp ? <p style={{ padding: '5px', color: 'red' }}>{ErrorDisp}</p> : null}

                    </div>
                    <p className='p2'>Already have an Account?</p>
                    <button className='buttonforLogin' onClick={() => navigate('/login')} >Login</button>
                </div>
                <div className='boxForAd'>
                    <p>{quotes[idx]}</p>
                </div>
            </div>
        </div>
    )
}

export default Signin
