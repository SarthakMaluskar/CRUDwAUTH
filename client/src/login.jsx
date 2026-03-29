import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const manageLogin = async()=>{
        try{
            const res = await axios.post('http://localhost:3000/api/login', {
            username,
            password
        }, {withCredentials : true})

        if(res.data.loggedIn){
            navigate('/')
        }
        }catch{
            alert('wrong username or pass')
        }
        
        
        setUsername("");
        
        setPassword("");
    }


    return (
        <>
            <div className="loginCard">
                <h1 className="loginTitle">Login page</h1>
                <input className="loginInput" placeholder="username" onChange={(e)=> setUsername(e.target.value)} value={username} type="text" />
                <input className="loginPass" placeholder="password" onChange={(e)=> setPassword(e.target.value)} value={password} type="password" />
                <button className="loginSend" onClick={manageLogin}>Login</button>
            </div>

            <Link to="/signup">Signup</Link>

        </>


    );
}
