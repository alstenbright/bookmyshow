import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

function MovieListItem() {
    const [posts, setPosts] = useState([]);
    const user = useSelector((store) => store.auth.user);
    
    const fetchPosts = useCallback(() => {
        if (user && user.token) {
            axios.get("http://127.0.0.1:8000/list", { 
                headers: { Authorization: `Token ${user.token}` }, 
            })
            .then((response) => {
                setPosts(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error("Failed to fetch the posts:", error);
            });
        }
    }, [user]);
    
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
    
    return (
        <div>
            <div className="container-lg">
                <div className="row">
                    {posts.map((item) => (
                        <div className="col-md-4" key={item.id}>
                            <Link style={{ textDecoration: 'none' }} to={"/blog/posts/" + item.id}>
                                <div className="card-mb-3">
                                    <img className="card-img-top" src={`http://127.0.0.1:8000${item.poster}`} alt={item.name} />
                                </div>
                                <div className="card-body">
                                    <center><h3 style={{ color: 'black' }} className="card-title">{item.time}</h3></center><br/>
                                    <center><h3 style={{ color: 'skyblue' }} className="card-title">{item.name}</h3></center>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieListItem;
