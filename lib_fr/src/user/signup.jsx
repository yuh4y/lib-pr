import axios from "axios";
import { useState } from "react";
export default function SignUp(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const [message,setMessage]=useState("");
    const roles = ["user"];
    function signUpForm(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/signup',
            data: {
              username: username,
              password: password,
              roles: roles,
              email: email
            }
          })
          .then((response) => {
                console.log(response)
                window.location.href = "http://localhost:3000/login"
          })
          .catch( error => {
            setMessage(error.response.data.message);
          });
    }
    return (
        <div>
            <div className="wrap signup-wrap">
            <h1 className="text-center mb-4 h1-cus">Đăng kí</h1>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 offset-xl-1">
                                <form id="formSignup">
                                    <div class="form-wrap form-outline mb-4">
                                        <label className="form-label font-weight-bold" for="exampleInputEmail1"></label>
                                        <input type="text" class="form" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div class="form-wrap form-outline mb-4">
                                        <label className="form-label font-weight-bold" for="exampleInputEmail1"></label>
                                        <input type="email" class="form" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div class="form-wrap form-outline mb-4">
                                        <label className="form-label font-weight-bold" for="exampleInputPassword1"></label>
                                        <input type="password" class="form" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="form-wrap form-outline mb-4">
                                        <small className="message" id="emailHelp" class="form-text text-muted">{message}</small>
                                    </div>
                                    <div className="text-center text-lg-start mt-4 pt-2 btn-wrap">
                                        <button type="submit" class="btn btn-lg btn-cus" onClick={signUpForm}>Sign up</button>
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