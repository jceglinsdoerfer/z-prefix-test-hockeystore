import { useContext, useState } from "react";

//this will be a detail of one specific item showing it's details

function ItemDetails(id) {
    let clickId = items_id;

    const [items, setItems] = useState([{}]) 
    if (typeof items !== "object") {
        console.log("error");
    } else {
    console.log(items);
    }  
  function set(clickId){
      for(let item of items) {
        if(items.id == id) {
          setItems(item)
        }
      }
    }
    set()
  return (
    <>
      {items.items_id}
      {items.items_name}
      {items.items_description}
    </>
  );
}

export default ItemDetails;
