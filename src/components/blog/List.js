import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../Navbar";
import "./Listposts.css"; // Assuming you create a CSS file for styling

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchPosts = useCallback(() => {
    if (user) {
      axios
        .get("http://127.0.0.1:8000/list", {
          headers: { Authorization: "Token " + user.token },
        })
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
          setError("Failed to fetch posts.");
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to home if user is not authenticated
    } else {
      fetchPosts();
    }
  }, [user, fetchPosts, navigate]); // Add navigate to the dependency array

  // Filter active posts
  const activePosts = posts.filter(post => post.is_active);

  return (
    <div className="list">
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12 border rounded p-6 bg-warning custom-border-shadow">
            <h1 className="text-center my-4 text-danger">MOVIE LIST</h1>
            {loading ? (
              <center>
                <h3 className="text-center bg-warning">Loading...</h3>
              </center>
            ) : error ? (
              <center>
                <h3 className="text-center bg-warning">{error}</h3>
              </center>
            ) : activePosts.length === 0 ? (
              <center>
                <h3 className="text-center bg-warning italic">
                  NO MOVIE POSTER FOUND...
                </h3>
              </center>
            ) : (
              <div className="row">
                {activePosts.map((post) => (
                  <div key={post.id} className="col-md-3 mb-3">
                    <Link to={`/blog/posts/${post.id}`} className="text-decoration-none">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={`http://127.0.0.1:8000${post.poster}`}
                          alt={post.name}
                        />
                        <div className="card-body">
                          <center>
                            <h3 className="card-title text-black">{post.time}</h3>
                          </center>
                          <center>
                            <h3 className="card-title text-skyblue">{post.name}</h3>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listposts;
