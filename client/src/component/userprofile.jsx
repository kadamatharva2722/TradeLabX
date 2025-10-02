import React, { useState } from "react";
import style from './userprofile.module.css';
import { useNavigate, Link } from "react-router";
import axios from "axios";

export default function UserProfile() {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [profileImg, setProfile] = useState(user.profileImg);
    const [amount, setAmount] = useState(user.amount || 0);
    const navigate = useNavigate();

    const datee = new Date(user.createdAt);
    const onlyDate = datee.toLocaleDateString('en-GB');

    // Enable editing
    function enableEdit() {
        setEdit(true);
    }
    async function deleteUser() {
        const result = window.confirm("Are you sure you want to delete Account");
        
        if (result) {
            const res = await axios.post("http://localhost:3000/deleteAccount", { email: user.email })

            if (res.data.message === "User successfully deleted") {
                console.log("User successfully deleted");
                localStorage.removeItem("user"); 
                navigate("/signin"); 
            } else {
                console.log(res.data.message);
            }
        }

        navigate('/register');
    }


    async function saveEdit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("amount", Number(amount));

        // Only append file if user selected a new one
        if (profileImg instanceof File) {
            formData.append("profileImg", profileImg);
        }

        try {
            const res = await axios.post('http://localhost:3000/EditProfile', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const userData = res.data.userData;
            localStorage.setItem("user", JSON.stringify(userData));

            setEdit(false); // disable editing after save
            navigate('/dashboard'); // navigate after successful save
        } catch (err) {
            console.error(err);
        }
    }

    // Handle file preview
    const displayImage =
        profileImg instanceof File ? URL.createObjectURL(profileImg) : user.profileImg;

    return (
        <div className={style.backgroundForUserProfile}>
            <div className={style.userProfileData}>

                <form onSubmit={saveEdit}>
                    <div className={style.profileImgAndname}>
                        <img src={displayImage} width={110} height={110} alt="Profile" className={style.imgStyle} />
                        {edit && (
                            <div>
                                <p>Add Profile Image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfile(e.target.files[0])}
                                    className={style.input2}
                                />
                            </div>
                        )}
                        <h1>
                            <input
                                type="text"
                                disabled={!edit}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={style.input1}
                            />
                        </h1>
                    </div>

                    <div className={style.profileBody}>
                        <h3>
                            Email:{" "}
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!edit}
                            />
                        </h3>
                        <h3>
                            Amount:{" "}
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={!edit}
                            />
                        </h3>
                        <h3 style={{ color: 'rgb(255, 255, 255, 0.4)', fontWeight: '300' }}>Account created at {onlyDate}</h3>
                    </div>

                    {/* Save button */}
                    {edit && (
                        <button type="submit" className={style.editbutton}>
                            Save Edit
                        </button>
                    )}
                </form>
                {/* Edit button outside form to prevent accidental submit */}
                {!edit && (
                    <button
                        type="button"
                        onClick={enableEdit}
                        className={style.editbutton}
                    >
                        Edit
                    </button>
                )}
                <button className={style.editbutton}> <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white' }}>Back to Home</Link></button>

                <button onClick={deleteUser} className={style.delete}>Delete Account</button>
            </div>
        </div>
    );
}
