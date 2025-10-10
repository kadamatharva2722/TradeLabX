import React, { useState } from "react";
import style from './userprofile.module.css';
import { useNavigate, Link } from "react-router";
import axios from "axios";

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [profileImg, setProfile] = useState(user.profileImg);
    const [amount, setAmount] = useState(user.amount || 0);
    const navigate = useNavigate();

    const datee = new Date(user.createdAt);
    const onlyDate = datee.toLocaleDateString('en-GB');

    const enableEdit = () => setEdit(true);

    const deleteUser = async () => {
        const result = window.confirm("Are you sure you want to delete your account?");
        if (!result) return;

        try {
            const res = await axios.post("http://localhost:3000/deleteAccount", { email: user.email });
            if (res.data.message === "User successfully deleted") {
                localStorage.removeItem("user");
                navigate("/signin");
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("amount", Number(amount));
        if (profileImg instanceof File) formData.append("profileImg", profileImg);

        try {
            const res = await axios.post('http://localhost:3000/EditProfile', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            localStorage.setItem("user", JSON.stringify(res.data.userData));
            setEdit(false);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    const displayImage = profileImg instanceof File ? URL.createObjectURL(profileImg) : user.profileImg;

    return (
        <div className={style.profileContainer}>
            <div className={style.profileCard}>
                <div className={style.profileHeader}>
                    <div className={style.imgWrapper}>
                        <img src={displayImage} alt="Profile" className={style.profileImage} />
                        {edit && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfile(e.target.files[0])}
                                className={style.fileInput}
                            />
                        )}
                    </div>
                    <input
                        type="text"
                        value={name}
                        disabled={!edit}
                        onChange={(e) => setName(e.target.value)}
                        className={style.nameInput}
                    />
                </div>

                <form onSubmit={saveEdit} className={style.profileBody}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled={!edit}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        disabled={!edit}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <p className={style.createdAt}>Account created at {onlyDate}</p>

                    {edit && <button type="submit" className={style.saveBtn}>Save Changes</button>}
                </form>

                <div className={style.profileActions}>
                    {!edit && <button onClick={enableEdit} className={style.editBtn}>Edit Profile</button>}
                    <Link to='/dashboard' className={style.backBtn}>Back to Home</Link>
                    <button onClick={deleteUser} className={style.deleteBtn}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}
