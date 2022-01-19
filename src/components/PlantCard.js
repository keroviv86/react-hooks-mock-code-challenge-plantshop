import React, {useState} from "react";

function PlantCard({id, name, image, price, handleDelete}) {
  const [inStock, setinStock]= useState(true)

  function onToggle(){
    setinStock((inStock)=> !inStock)
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    handleDelete(id)
  }

  
  return (
    <li className="card">
      {inStock ? 
      <>
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <p>Price: {price}</p>
      </>
       : ""}
      {inStock ? (
        <button onClick= {onToggle} className="primary">In Stock</button>
      ) : (
        <button onClick= {onToggle}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
