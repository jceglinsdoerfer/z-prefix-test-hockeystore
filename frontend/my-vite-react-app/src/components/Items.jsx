//this will be a normal list of all items that everyone can access but not manipulate(users can manipulate);
import { useState, useEffect } from 'react';
import NavBar from "./NavBar";


export default function Items() {
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/hockeystore/items', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8000/hockeystore/items/${itemId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            const result = await response.json();
            console.log(result.message);

            setItems(items.filter(item => item.items_id !== itemId));
        } catch (err) {
            console.error('Error deleting item:', err.message);
        }
    };

    const handleDetails = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8000/hockeystore/items/${itemId}`, {
                method: '',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            const result = await response.json();
            console.log(result.message);

            setItems(items.filter(item => item.items_id, item.items.name, item.items.description !== itemId));
        } catch (err) {
            console.error('Error deleting item:', err.message);
        }
    };

    if (items.length === 0) {
        return <div>No items available.</div>

    }

    return (
        <div className="items-container">
            <header className="header">
                <NavBar />
            </header>
            <h2>All Items</h2>
            <div className="items-list">
                {items.map((item) => (
                    <div key={item.items_id} className="item-card">
                        <h3>{item.item_name}</h3>
                        {/* <p>{item.description}</p> */}
                        <button 
                            className="nav-btn"
                            onClick={() => handleAddItem(item.items.id)}
                            >Add to Your list</button>
                        <button
                            className="nav-btn"
                            onClick={() => handleDelete(item.items_id)}
                        >Delete this item</button>
                        <button
                            className="nav-btn"
                            onClick={() => handleDetails(items.items_id)}
                        >View details</button>
                    </div>
                ))}

            </div>
        </div>
    )
};
