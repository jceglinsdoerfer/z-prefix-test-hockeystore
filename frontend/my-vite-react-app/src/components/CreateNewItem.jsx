import { useState } from "react";
import NavBar from "./NavBar";



function CreateNewItem() {
  const [formItem, setFormItem] = useState({
    item_name: "",
    description: ""    
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/hockeystore/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formItem)
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(`Item: ${data.items.item_name} has been added`);
        setFormItem({ item_name: "", description: "" });
      } else {
        setMessage(data.error || "Added item failed");
      }
    } catch (err) {
      setMessage("Error connecting to server");
      console.log("Submit error:", err);
    }
  };





return (
  <>
    <header className="header">
      <NavBar />
    </header>
    <div>
      <h3>Please enter new item information</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="item_name"
          value={formItem.item_name}
          placeholder="Enter Item name"
          onChange={handleChange}
          required />
        <input
          name="description"
          value={formItem.description}
          placeholder="Enter description"
          onChange={handleChange}
          required />          
        <button type="submit">Add Item</button>
      </form>
    </div>
  </>

);
}

export default CreateNewItem;
