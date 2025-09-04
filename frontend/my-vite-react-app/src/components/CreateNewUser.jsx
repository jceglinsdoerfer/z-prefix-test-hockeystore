//not sure how to do this....
import NavBar from "./NavBar";
import { useState } from 'react';

export default function CreateNewUser() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        user_name: "",
        password: ""
    });
    //or do I leave the default of usestate empty object?
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted", formData);
        fetch("http://localhost:8000/hockeystore/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to create user");
                return res.json();
            })
            .then((data) => {
                console.log("User Created:", data);
                setFormData({
                    first_name: "",
                    last_name: "",
                    user_name: "",
                    password: ""
                })

            })
            .catch((err) => {
                console.log("Error:", err);
            })
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    return (
        <>
            <header className="header">
                <NavBar />
            </header>
            <div>
                <main>
                    <div id="component-container">
                    </div>
                    <div>
                        <h3>Please enter first name, last name, username and password to create an account</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="first_name"
                                value={formData.first_name}
                                placeholder="Enter First Name"
                                onChange={handleChange} />
                            <input
                                name="last_name"
                                value={formData.last_name}
                                placeholder="Enter Last Name"
                                onChange={handleChange} />
                            <input
                                name="user_name"
                                value={formData.user_name}
                                placeholder="Enter User name"
                                onChange={handleChange} />
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                placeholder="Enter Password"
                                onChange={handleChange} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </main>
                <footer className="footer">

                </footer>
            </div>
        </>
    );
};

