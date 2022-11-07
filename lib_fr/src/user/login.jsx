import axios from "axios";
import { useState } from "react";
import './signup.css'
import {useNavigate ,
    useHistory,
    useLocation} from 'react-router-dom';

export default function Login(){
    const [username,setUsername]= useState("");
    const [password,setPassword] = useState("");
    const [jwt,setJwt] = useState("");
    const [message,setMessage]=useState("");
    function loginForm(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/signin',
            data: {
              username: username,
              password: password
            }
          })
          .then((response) => {
               
                console.log(response)
                setJwt(response.data.accessToken)
                localStorage.setItem("token",response.data.accessToken)
                localStorage.setItem("username",response.data.username)
                window.location.href = "http://localhost:3000/"
          }, (error) => {
            setMessage(error.response.data.message);
          });
    }
    return (
        <div>
            <div className="wrap login-wrap">
                <h1 className="text-center mb-4 h1-cus">Đăng nhập</h1>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 offset-xl-1">
                            <form id="formSignup">
                                <div class="form-wrap form-outline mb-4">
                                    <label className="form-label font-weight-bold" for="exampleInputEmail1"></label>
                                    <input type="email" class="form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div class="form-wrap form-outline mb-4">
                                    <label className="form-label font-weight-bold" for="exampleInputPassword1"></label>
                                    <input type="password" class="form" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="message">
                                    <small id="emailHelp" class="form-text text-muted">{message}</small>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2 btn-wrap">
                                    <button type="submit" class="btn-cus" onClick={loginForm}>Đăng nhập</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}