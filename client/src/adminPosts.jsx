import "./styles/blogs.css"
import { useNavigate } from "react-router-dom";
export default function AdminPost({blogs,handleDelete}){

    const navigate = useNavigate();

    return(
        <div className="Postsection">
            <h1>Admin Home</h1>

            <div className="blogsSection">
                {
                    blogs.map((blog,index)=>{
                        return(
                            <div key={index} className="blogBlock">
                            <h2>{blog.title}</h2>
                            <p>{blog.authorId.username}</p>
                            <p>{blog.content}</p>

                            <button onClick={()=>handleDelete(blog._id)}>Delete</button>
                            <button onClick={()=>navigate(`/blogs/update/${blog._id}`)}>Edit</button>
                        </div>
                        )
                    })

                }
            </div>
        </div>
    );
}