import React, { useEffect, useState } from "react";
import './signin.css';
import { useNavigate } from "react-router";
import axios from 'axios';

function Login() {
    const quotes = [
        "The goal of a successful trader is to make the best trades. Money is secondary.",
        "An investment in knowledge pays the best interest.",
        "The four most dangerous words in investing are: ‘This time it’s different.",
        "Every once in a while, the market does something so stupid it takes your breath away."
    ];

    const [idx, setIdx] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorDisp, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const id = setInterval(() => {
            setIdx((i) => (i === 3 ? 0 : i + 1));
        }, 4000);
        return () => clearInterval(id);
    }, []);

    function submitForm(e) {
        e.preventDefault();
        if (isLoading) return; // prevent double click

        setIsLoading(true);
        setError('');

        axios.post(
            'https://trade-lab-x-server.vercel.app/login',
            { email, password }
        )
            .then(res => {
                const userData = res.data.user;
                localStorage.setItem("user", JSON.stringify(userData));
                navigate('/dashboard');
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError('Something went wrong. Please try again.');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className='backgroundForSignLog'>
            <h1 className='h11'>TradeLabX</h1>
            <p className='pofheading'>- The Edge behind every trade -</p>

            <div className='boxForConnection'>
                <div className='boxForsignlog'>
                    <h3>Welcome back Trader!</h3>

                    <div className='form1'>
                        <form onSubmit={submitForm}>
                            <label>Email</label><br />
                            <input
                                type="email"
                                placeholder='Enter Email'
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />

                            <label>Password</label><br />
                            <input
                                type="password"
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />

                            <button
                                type='submit'
                                disabled={isLoading}
                                className={isLoading ? "disabledBtn" : ""}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        {ErrorDisp && (
                            <p style={{ padding: '5px', color: 'rgb(225,45,45)', fontSize: '17px' }}>
                                {ErrorDisp}
                            </p>
                        )}
                    </div>

                    <p className='p2'>Don't have an account?</p>
                    <button
                        className='buttonforLogin'
                        onClick={() => navigate('/signin')}
                        disabled={isLoading}
                    >
                        Register
                    </button>
                </div>

                <div className='boxForAd'>
                    <p>{quotes[idx]}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
