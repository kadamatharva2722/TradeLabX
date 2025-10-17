import React, { useState } from "react";
import style from './userprofile.module.css';
import { useNavigate, Link } from "react-router";
import axios from "axios";

export default function UserProfile() {
  // Load user from localStorage
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userFromStorage);

  // Form fields
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [amount, setAmount] = useState(user.amount || 0);
  const [profileImg, setProfile] = useState(null); // new selected file

  const navigate = useNavigate();
  const onlyDate = new Date(user.createdAt).toLocaleDateString('en-GB');

  // Toggle edit mode
  const enableEdit = () => setEdit(true);

  // Delete account
  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await axios.post(
        "https://trade-lab-x-server.vercel.app/deleteAccount",
        { email: user.email }
      );
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

  // Save edited data
  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("amount", Number(amount));
      if (profileImg) formData.append("profileImg", profileImg);

      const res = await axios.post(
        "https://trade-lab-x-server.vercel.app/EditProfile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update state and localStorage
      setUser(res.data.userData);
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      setEdit(false);
      setProfile(null); // reset selected file
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Determine which image to show
  const displayImage = profileImg instanceof File
    ? URL.createObjectURL(profileImg) // preview newly selected file
    : user.profileImg && user.profileImg !== '/assets/Profile.png'
      ? `https://trade-lab-x-server.vercel.app${user.profileImg}?t=${Date.now()}` // backend image
      : 'https://trade-lab-x-server.vercel.app/assets/Profile.png'; // default

  return (
    <div className={style.profileContainer}>
      <div className={style.profileCard}>
        {/* Header with profile image and name */}
        <div className={style.profileHeader}>
          <div className={style.imgWrapper}>
            <img
              src={displayImage}
              alt="Profile"
              className={style.profileImage}
            />
          </div>
          <input
            type="text"
            value={name}
            disabled={!edit}
            onChange={(e) => setName(e.target.value)}
            className={style.nameInput}
          />
        </div>

        {/* Edit form */}
        <form onSubmit={saveEdit} className={style.profileBody}>
          <label>Profile Image</label>
          {edit && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
              className={style.fileInput}
            />
          )}

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

        {/* Action buttons */}
        <div className={style.profileActions}>
          {!edit && <button onClick={enableEdit} className={style.editBtn}>Edit Profile</button>}
          <Link to='/dashboard' className={style.backBtn}>Back to Home</Link>
          <button onClick={deleteUser} className={style.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}
