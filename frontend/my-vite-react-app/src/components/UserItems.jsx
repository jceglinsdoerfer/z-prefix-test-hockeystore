import { useState, useEffect } from 'react';
import LoggedInNavBar from "./LoggedInNavBar";
import NavBar from './NavBar';
import useAuth from '../hooks/useAuth';

export default function UserItems () {
    const [userItems, setUserItems] = useState([]);
    const [ isAuthenticated ] = useAuth();

    useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = async () => {
      //need to add user_id to show only those items that have a user_id = to the one logged in...
        const response = await fetch(`http://localhost:8000/hockeystore/userItems`);
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
                {isAuthenticated? <LoggedInNavBar /> : <NavBar/>}
            </header>
           <h2>User Items</h2> 
            <div className="items-list">
                {userItems.map((item) => (
                    <div >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
};


