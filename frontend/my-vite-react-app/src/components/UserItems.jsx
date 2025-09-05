import { useState, useEffect } from 'react';
import LoggedInNavBar from "./LoggedInNavBar";
import NavBar from './NavBar';
import useAuth from '../hooks/useAuth';

export default function UserItems() {
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (user && user.user_id) {
            fetchItems(user.user_id);
        } else {
            setLoading(false);
        }

    }, [user]);

    const fetchItems = async(userId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/hockeystore/useritems/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setUserItems(data);
        } catch (error) {
            console.error('Error fetching user items:', error);
        } finally {
            setLoading(false);
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="items-container">
                <header className="header">
                    <NavBar />
                </header>
                <h2>Please log in to view your items</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="itmes-container">
                <header className="header">
                    <LoggedInNavBar />
                </header>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="items-container">
            <header className="header">
                <LoggedInNavBar />
            </header>
            <h2>Your items</h2>
            {userItems.length === 0 ? (
                <div>You have no items yet.</div>
            ) : (
                <div className="items-list">
                    {userItems.map((item, index) => (
                        <div key={index} className="item-card">
                            <p>Item Name: {item.item_name}</p>
                            <p>Item ID: {item.item_id}</p>
                            <p>Item description: {item.description}</p>
                            <p>Quantity: {item.quantity}</p>

                        </div>
                    ))}

                </div>
            )}
        </div>
    )
};


