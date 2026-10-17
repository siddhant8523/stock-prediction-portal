import { useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmitRegistration(e) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) return;

    setLoading(true);
    setError({});
    setSuccess(false);

    const userData = {
      username: username.trim(),
      email: email.trim(),
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData,
        {
          timeout: 10000,
        },
      );

      console.log("Registration successful:", response.data);

      // Clear fields after successful registration
      setUsername("");
      setEmail("");
      setPassword("");

      // Clear validation errors and show success
      setError({});
      setSuccess(true);
    } catch (e) {
      console.error("Registration failed:", e.message);

      if (e.response) {
        // Django returned validation or server errors
        const data = e.response.data;

        if (data && typeof data === "object" && !Array.isArray(data)) {
          setError(data);
        } else {
          setError({
            general: "Registration failed. Please try again.",
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
    <div className="d-flex justify-content-center align-items-center flex-grow-1 py-4 ">

      <div className="col-11 col-sm-8 col-md-5 col-lg-4 bg-light-dark p-4 p-md-5 ">
        <h3 className="text-light text-center fw-bold mb-4">
          Create an Account
        </h3>

        <form onSubmit={handleSubmitRegistration}>
          {success && (
            <div className="alert alert-success rounded-3" role="status">
              Registration successful!
            </div>
          )}

          {error.general && (
            <div className="alert alert-danger rounded-3" role="alert">
              {error.general}
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
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            {error.email && (
              <div className="text-danger small mt-1" role="alert">
                {Array.isArray(error.email)
                  ? error.email.join(" ")
                  : error.email}
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              autoComplete="new-password"
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
                Registering
                <BeatLoader size={5} color="#000000" />
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
