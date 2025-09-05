import { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';

function Login() {

  const [formData, setFormData] = useState({
    user_name: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/hockeystore/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.user.first_name)

      if (response.ok) {
        setMessage(`Welcome ${data.user.first_name}! You are now logged in.`);
        setFormData({ user_name: "", password: "" });
        console.log("checking if it got here.");
        setTimeout(() => navigate('/LoggedIn'), 100)
      } else {
        setMessage(data.error || "Login Failed");
      }
    } catch (err) {
      setMessage("Error connectin to server");
      console.log("Login error:", err);
    }
  };





  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <div>
        <h3>Please enter User Name and Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="user_name"
            value={formData.user_name}
            placeholder="Enter User name"
            onChange={handleChange}
            required />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={handleChange}
            required />
          <button type="submit">Log in</button>
        </form>
        {message}
      </div>
    </>

  );
}

export default Login;
