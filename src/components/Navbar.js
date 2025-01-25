import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import "./Navbar.css"; // Assuming you create a CSS file for styling

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    if (user && user.token) {
      axios
        .post(
          "http://127.0.0.1:8000/api/logout/",
          {},
          {
            headers: { Authorization: "Token " + user.token },
          }
        )
        .then(() => {
          dispatch(removeUser());
          navigate("/login");
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Handle the case where the token is invalid or expired
            dispatch(removeUser());
            navigate("/login");
          } else {
            console.error("Logout error:", error);
            // Optionally, display an error message to the user
            // setError('An error occurred during logout. Please try again.');
          }
        });
    } else {
      console.error("No user or token found");
      // Optionally, handle the case where there's no user or token
      // setError('User not logged in');
      navigate("/login");
    }
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-brand">
        <h4>bookmyshow</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aboutus" className="nav-link" activeClassName="active">
              About Us
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink to="/list" className="nav-link" activeClassName="active">
                  My Booking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Pre" className="nav-link" activeClassName="active">
                  Prebookings
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/register" className="nav-link" activeClassName="active">
                Signup
              </NavLink>
            </li>
          )}
          {user ? (
            <li className="nav-item">
              <span className="nav-link logout-link" onClick={logout}>
                Logout
              </span>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" activeClassName="active">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
