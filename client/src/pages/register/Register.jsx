import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { upload } from "../../../../api/utils/upload";

import "./Register.scss";

function Register() {
  //hooks
  const [file, setFile] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const navigate = useNavigate();

  //functions
  const handleChange = (e) => {
    e.preventDefault();
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    console.log(url);
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", {
        ...user,
        img: url.toString(),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // const upload = async (file) => {
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "fiverr");

  //   try {
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dndcersc4/upload",
  //       data
  //     );
  //     return res.data.url;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="register">
      <form onSubmit={handleFormSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
