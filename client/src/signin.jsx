import React, { useEffect, useState } from "react";
import './signin.css';
import { useNavigate } from "react-router";
import axios from 'axios';

function Signin() {
    const quotes = [
        "The goal of a successful trader is to make the best trades. Money is secondary.",
        "An investment in knowledge pays the best interest.",
        "The four most dangerous words in investing are: ‘This time it’s different.",
        "Every once in a while, the market does something so stupid it takes your breath away."
    ];

    const [idx, setIdx] = useState(0);
    const [name, setName] = useState('');
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
        if (isLoading) return;

        setIsLoading(true);
        setError('');

        axios.post('http://localhost:3000/register', { name, email, password })
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                if (err.response?.data?.error) {
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
                    <h3>Create Your Account</h3>

                    <div className='form1'>
                        <form onSubmit={submitForm}>
                            <label>Name</label><br />
                            <input placeholder='Enter Name'
                                onChange={(e) => setName(e.target.value)} />

                            <label>Email</label><br />
                            <input type="email" placeholder='Enter Email'
                                onChange={(e) => setEmail(e.target.value)} />

                            <label>Password</label><br />
                            <input type="password" placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)} />

                            <button
                                type='submit'
                                disabled={isLoading}
                                className={isLoading ? "disabledBtn" : ""}
                            >
                                {isLoading ? "Registering..." : "Register"}
                            </button>
                        </form>

                        {ErrorDisp && (
                            <p style={{ color: 'red', fontSize: '15px' }}>
                                {ErrorDisp}
                            </p>
                        )}
                    </div>

                    <p className='p2'>Already have an Account?</p>
                    <button
                        className='buttonforLogin'
                        onClick={() => navigate('/login')}
                        disabled={isLoading}
                    >
                        Login
                    </button>
                </div>

                <div className='boxForAd'>
                    <p>{quotes[idx]}</p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
