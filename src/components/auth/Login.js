
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
      .post("http://127.0.0.1:8000/login", {
        username: name,
        password: password,
      })
      .then((response) => {
        setErrorMessage("");
        const { token, username: name, isAdmin } = response.data;
        const user = {
          username: name,
          token,
          isAdmin,
        };
        dispatch(setUser(user));
        if (isAdmin) {
          navigate("/cruedadmin");
        } else {
          navigate("/");
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

  function goToHomePage() {
    navigate("/Admin");
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "620px" }}>
          <div className="col-md-6">
            <div className="login-form border rounded p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
              <h1 className="text-center mb-4">Login</h1>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form>
                <div className="form-group">
                  
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group text-center">
                  <button type="button" className="btn btn-primary form-control" onClick={userlogin}>Login</button>
                  <button type="button" className="btn btn-link" onClick={goToHomePage}>Admin Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);

