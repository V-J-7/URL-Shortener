import React , {useState} from 'react'
import '../styles/Authentication.css'
function validEmail(email) {
    const regex = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validPassword(password) {
    if (!/[a-z]/.test(password)) {
        return "Password should have at least one lowercase character";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password should have at least one uppercase character";
    }
    if (!/\d/.test(password)) {
        return "Password should have at least one digit";
    }
    if (password.length < 6) {
        return "Password should have at least 6 characters";
    }
    return "";
}
const SignupForm=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailMessage,setEmailMessage]=useState('');
    const [passwordMessage,setPasswordMessage]=useState('');
    const [signupMessage,setSignupMessage]=useState('');
    const handleSignup=async(e)=>{
        e.preventDefault()
        if (!validEmail(email)){
            setEmailMessage("Invalid Email");
            return;
        }
        else{
            setEmailMessage('');
        }
        const passwordError=validPassword(password);
        if (passwordError!==""){
            setPasswordMessage(passwordError)
            return;
        }
        else{
            setPasswordMessage('');
        }
        const res=await fetch("http://localhost:8080/auth/signup",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const message=await res.text()
        setSignupMessage(message);
        setPassword('')
        setEmail('')
    }
    return(
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSignup} className="auth-form">
                <label>
                    Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"></input>
                </label>
                <p className="error">{emailMessage}</p>
                <label>
                    Password:<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="new-password"></input>
                </label>
                <p className="error">{passwordMessage}</p>
                <button type="submit">Sign up</button>
            </form>
            {signupMessage && <p className="success">{signupMessage}</p>}
        </>
    )
}

export default SignupForm