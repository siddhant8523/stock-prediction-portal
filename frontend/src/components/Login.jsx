import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()

  async function handleLogin(e) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) return;

    setLoading(true);
    setError({});
    setSuccess(false);

    const userData = {
      username: username.trim(),
      password,
    };

    try {
      const response = await axiosInstance.post(
        '/token/',
        userData,
        {
          timeout: 10000,
        }
      );

      const { access, refresh } = response.data;

      // Check that the API returned the expected tokens
      if (!access || !refresh) {
        setError({
          general: "Login failed. The server returned an invalid response.",
        });
        return;
      }

      // Store tokens for this learning project
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    
      console.log("Login successful");

      setIsLoggedIn(true);

      // Clear form fields
      setUsername("");
      setPassword("");

      setError({});
      setSuccess(true);
      navigate('/dashboard')
    } catch (e) {
      console.error("Login failed:", e.message);

      if (e.response) {
        const data = e.response.data;

        if (data && typeof data === "object" && !Array.isArray(data)) {
          setError(data);
        } else {
          setError({
            general: "Invalid username or password.",
          });
        }
      } else if (e.code === "ECONNABORTED") {
        setError({
          general: "The request timed out. Please try again.",
        });
      } else {
        setError({
          general: "Unable to connect to the server. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 py-4">
      <div className="col-11 col-sm-8 col-md-5 col-lg-4 bg-light-dark p-4 p-md-5 rounded-4">
        <h3 className="text-light text-center fw-bold mb-4">
          Login to Your Account
        </h3>

        <form onSubmit={handleLogin}>
          {success && (
            <div className="alert alert-success rounded-3" role="status">
              Login successful!
            </div>
          )}

          {error.general && (
            <div className="alert alert-danger rounded-3" role="alert">
              {Array.isArray(error.general)
                ? error.general.join(" ")
                : error.general}
            </div>
          )}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />

            {error.username && (
              <div className="text-danger small mt-1" role="alert">
                {Array.isArray(error.username)
                  ? error.username.join(" ")
                  : error.username}
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            {error.password && (
              <div className="text-danger small mt-1" role="alert">
                {Array.isArray(error.password)
                  ? error.password.join(" ")
                  : error.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-info d-flex justify-content-center align-items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                Logging in
                <BeatLoader size={5} color="#000000" />
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;