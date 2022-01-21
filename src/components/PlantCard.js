import React, {useState} from "react";

function PlantCard({id, name, image, price, handleDelete, handlePrice}) {
  const[sold, soldSetter]= useState(false)
  const [newPrice, newPriceSetter]= useState(price)
  // const [newPrice, newPriceSetter]= useState(price)

  function handleToggle(){
    soldSetter((sold)=> !sold)
  }

  function onHandleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE',
    })
    handleDelete(id)
  }


  function onHandlePrice(){
    newPriceSetter(parseInt(price + 10))
    const newPlantPrice = {
      price: newPrice,
      id: id
    }
    // handlePrice(newPlantPrice)
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlantPrice)
    })
    .then(res=>res.json())
    .then((newPrice)=> handlePrice(newPrice))
    
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
        <button onClick = {handleToggle} className="primary">{sold ? "Out of Stock" : "In Stock"}</button>
        <button onClick={onHandleDelete}>Delete</button>
        <button onClick={onHandlePrice}>Update Price</button>
    </li>
  );
}

export default PlantCard;

