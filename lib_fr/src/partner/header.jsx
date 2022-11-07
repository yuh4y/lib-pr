import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import logo from './logo.png';
import './header.css'


export default function Header(){
    const [username,setUsername] = useState("")
    function logOut(){
        localStorage.clear();
        window.location.href="/"
    }
    useEffect(()=>{
        setUsername(localStorage.getItem("username"))
    },[]);
    return (
        <div>
            <nav class="header row">
                <div className="logo col-9">
                    <a href="#">
                        <img src={logo} alt="Logo thư viện"/>
                    </a>
                    <h4>Thư viện sách PTIT</h4>
                </div>
                <div className="btn-add-wrap col-3">
                    <div style={{display: !username? "block":"none" }}>
                        <Link to="/login" className="login-btn">Đăng nhập</Link>
                        <Link to="/sign-up" className="singup-btn">Đăng kí</Link>
                    </div>
                    <div style={{display: username? "block":"none" }}>
                        <button onClick={logOut} className="btn-add">Đăng xuất</button>
                    </div>
                </div>
            </nav>         
        </div>
    );
}