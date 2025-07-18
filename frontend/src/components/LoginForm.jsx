import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {EmailContext} from "../EmailContext.js";

function LoginForm(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginMessage,setLoginMessage]=useState('');
    const navigate=useNavigate()
    const {setEmailContext}=useContext(EmailContext);
    async function handleLogin(e){
        e.preventDefault()
        try{
            const res=await fetch("http://localhost:8080/auth/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({email,password}),
            })
            const loginMessage=await res.text();
            setLoginMessage(loginMessage);
            if (loginMessage==="Login Successful!"){
                localStorage.setItem("email",email);
                setEmailContext(email)
                navigate("/dashboard")
            }

        }
        catch (err){
            console.log(err)
        }
    }
    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="auth-form">
                <label>
                    Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter your email"></input>
                </label>
                <label>
                    Password:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"></input>
                </label>
                <button type="submit">Login</button>
            </form>
            <p className="status-msg">{loginMessage}</p>
        </>
    )
}

export default LoginForm