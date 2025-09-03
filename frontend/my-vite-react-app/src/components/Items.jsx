//this will be a normal list of all items that everyone can access but not manipulate(users can manipulate);
import { useState, useEffect } from 'react';


export default function Items () {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = async () => {
        const response = await fetch('http://localhost:8000/hockeystore/items');
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
    }
    
    if (items.length === 0) {
        return <div>No items available.</div>
    }

    return (
        <div className="items-container">
           <h2>All Items</h2> 
            <div className="items-list">
                {items.map((item) => (
                    <div key={item.items_id} className="item-card">
                        <h3>{item.item_name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};
