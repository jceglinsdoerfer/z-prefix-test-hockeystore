import { useState } from "react";
import NavBar from "./NavBar";
//need to make this a login page!!
function Login() {
  const [formData, setFormData] = useState({
    user_name: "",
    password: ""
  });
  const [message, setMessage] = useState("");

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

      if (response.ok) {
        setMessage(`Welcome ${data.user.first_name}! You are now logged in.`);
        setFormData({ user_name: "", password: "" });
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
    </div>
  </>

);
}

export default Login;
