//THis is going to be a list of a specific users items list
import { useState, useEffect } from 'react';
import LoggedInNavBar from "./LoggedInNavBar";
//need to import the user_id to filter items they have....

export default function UserItems () {
    const [userItems, setUserItems] = useState([]);
    
    useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = async () => {
      //need to add user_id to show only those items that have a user_id = to the one logged in...
        const response = await fetch(`http://localhost:8000/hockeystore/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setUserItems(data);
    }
    
    if (userItems.length === 0) {
        return <div>No items available.</div>
    }

    return (
        <div className="items-container">
            <header className="header">
                <LoggedInNavBar />
            </header>
           <h2>User Items</h2> 
            <div className="items-list">
                {userItems.map((item) => (
                    <div key={item.items_id} className="item-card">
                        <h3>{item.item_name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};


