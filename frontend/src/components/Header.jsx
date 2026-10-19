import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    // Remove JWT tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Update authentication state
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login", { replace: true });
  }

  return (
    <div>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className="navbar-brand text-light" to="/">
          <h3 className="fw-bold">Stock Market Predictor</h3>
        </Link>

        {isLoggedIn ? (
          <div className="d-inline-flex gap-3">
            <Button type="info" url="/Dashboard" text="Dashboard" />

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="d-inline-flex gap-3">
            <Button type="info" url="/login" text="Login" />
            <Button type="outline-info" url="/register" text="Register" />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
