import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");

    const manageSignup = async()=>{
        try{
            const res = await axios.post('http://localhost:3000/api/signup', {
            username,
            password,
            email
        },{withCredentials : true}) 

        navigate('/')
        }catch{
            alert("signup failed")
        }
        

        console.log("signed up")
        setUsername("");
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <div className="signupCard">
                <h1 className="signupTitle">Signup page</h1>
                <input className="signupInput" placeholder="email" onChange={(e)=> setEmail(e.target.value)} value={email} type="email" />
                <input className="signupInput" placeholder="username" onChange={(e)=> setUsername(e.target.value)} value={username} type="text" />
                <input className="signupPass" placeholder="password" onChange={(e)=> setPassword(e.target.value)} value={password} type="password" />
                <button className="signupSend" onClick={manageSignup}>Signup</button>
            </div>
            <Link to="/login">Login</Link>
        </>


    );
}
