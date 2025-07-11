import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ showAlert }) {
      const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   const host = process.env.REACT_APP_API_URL;

    
    e.preventDefault();
    // Check condition to register user

    if(credentials.name.length<3){
      return showAlert("❗ Name must be at least 3 characters long", "danger");  
    }
    const nameRegex = /^[A-Za-z\s]+$/; // only letters and spaces
    if(!nameRegex.test(credentials.name)){
        return showAlert("❗ Name can only contain letters and spaces", "danger");
    }
     if (credentials.password.length < 6) {
    return showAlert("❗ Password must be at least 6 characters long", "danger");
  }

    // ✅ Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      showAlert("❌ Passwords do not match", "danger");
      return;
    }
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("username", json.user.name); // ✅ Save name

        showAlert("🎉 Signup successful!", "success");
        navigate("/dashboard");
      } else {
        showAlert("❌ Signup failed: " + json.error, "danger");
      }
    } catch (error) {
      showAlert("❌ Server error during signup", "danger");
      console.error(error);
    }

    // Reset form
    // setCredentials({ name: "", email: "", password: "", cpassword: "" });
  };

  return (
    <>
 

    {/* Signup Form */}
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded bg-light"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">🔐 Signup to iNotebook</h3>

        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
{/* Password input */}
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            minLength={5}
            required
          />
           {/* Eye Icon */}
      <i
        className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          top: '70%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#6c757d'
        }}
      ></i>      {/* Eye Icon */}
      <i
        className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          top: '70%',
          right: '10px',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#6c757d'
        }}
      ></i>
        </div>

        <div className="mb-4">
          <label htmlFor="cpassword" className="form-label fw-bold">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        

        <button type="submit" className="btn btn-primary w-100">
          🚀 Create Account
        </button>
        <div>
          <p className="text-muted text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
    {/* End of Signup Form */}

    </>
  );
}
