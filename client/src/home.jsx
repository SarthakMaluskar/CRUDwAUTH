import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AdminPost from './adminPosts';
import UserPost from './userPosts';
import axios from 'axios'
export default function Home() {

    const [isAdmin , setIsAdmin] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {

        const getUserInfo = async()=>{
             const res = await axios.get('http://localhost:3000/api/me',{withCredentials : true} )


             console.log(res.data)
             if(res.data.isAdmin){
                setIsAdmin(true);
             }else{
                setIsAdmin(false);
             }
        }

        getUserInfo();
       
    }, [])

     useEffect(()=>{
        const getBlogs = async()=>{
            const res = await axios.get('http://localhost:3000/api/blogs', {withCredentials : true});
            setBlogs(res.data)
        }

        getBlogs();
    },[])

    const manageDelete = async(blogId)=>{
        try{
             await axios.delete(`http://localhost:3000/api/blogs/${blogId}`, {withCredentials : true})
        setBlogs(prev => prev.filter(blog => blog._id !== blogId));
        }catch(error){
            alert(error.message);
        }
       
    }

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/logout",
                {},
                { withCredentials: true }
            );
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    if (isAdmin === null) return <h1>Loading...</h1>;


    return (
        <>  
            <button onClick={handleLogout}>Logout</button>
            <button onClick={()=>navigate('/create')}>Create Post</button>
            {isAdmin ?<AdminPost blogs={blogs} handleDelete={manageDelete}/> : <UserPost blogs={blogs} handleDelete={manageDelete}/>}

        </>

    );
}

