import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import checkGuest from "./checkguest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function userlogin() {
    axios
      .post("http://127.0.0.1:8000/admin/login/", {
        username: name,
        password: password,
      })
      .then((response) => {
        const { token, username: name, isAdmin } = response.data;
        const user = {
          username: name,
          token,
          isAdmin,
        };
        dispatch(setUser(user));
        if (isAdmin) {
          navigate("/aboutus"); // Redirect if admin
        } else {
          navigate("/"); // Redirect to home or handle non-admin redirection
        }
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrorMessage(
            Object.values(error.response.data.errors).join(" ")
          );
        } else if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to login user. Please contact admin");
        }
      });
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="text-center mb-4">Admin Login</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn btn-primary btn-block" onClick={userlogin}>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
