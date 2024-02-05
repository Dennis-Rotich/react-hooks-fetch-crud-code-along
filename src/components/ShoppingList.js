import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/items')
    .then(res => res.json())
    .then(items => setItems(items))
    .catch(err => console.error(err))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem){
    setItems([...items,newItem])
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = items.map((item)=>{
      if (item.id === updatedItem.id){ return updatedItem;}
      else{ return item; }
    })
    setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem){
    const filteredItems = items.filter((item)=> item.id !== deletedItem.id )
    setItems(filteredItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdatedItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
