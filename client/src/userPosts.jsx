import axios from "axios";
import "./styles/blogs.css"

import { useNavigate } from "react-router-dom";

export default function UserPost({blogs,handleDelete}){
    const navigate = useNavigate();
    
    
    return(
        <div className="Postsection">
            <h1>User Home</h1>

            <div className="blogsSection">

                {blogs.length === 0 ? <p>NO Posts</p> : null}
                {
                    blogs.map((blog,index)=>{
                        return(
                            <div key={index} className="blogBlock">
                            <h2>{blog.title}</h2>
                            
                            <p>{blog.content}</p>

                            <button onClick={()=>handleDelete(blog._id)}>Delete</button>
                            <button onClick={()=>{navigate(`/blogs/update/${blog._id}`)}}>Edit</button>
                        </div>
                        )
                    })

                }
            </div>
        </div>
    );
}