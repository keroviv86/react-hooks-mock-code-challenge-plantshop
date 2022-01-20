import React, {useState} from "react";

function PlantCard({id, name, image, price, handleDelete, handlePrice}) {
  const [inStock, setinStock]= useState(true)
  const [newPrice, setNewPrice] = useState(price)

  function onToggle(){
    setinStock((inStock)=> !inStock)
  }
  function onHandleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    handleDelete(id)
  }

  function onUpdatePrice(e){
    setNewPrice(e.target.value)
  }
 
  function onHandlePrice(event){
    event.preventDefault()
    const newPlantPrice = {
      price: newPrice,
      // id: id
    }
    //make fetch
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newPlantPrice)
      //OR
      // body:JSON.stringify(
      //   {price: newPrice,
      //   id: id})
    })
    .then(res=>res.json())
    .then((newPlantPrice)=>handlePrice(newPlantPrice))
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
      <button onClick={onHandleDelete}>Delete</button>
      <form onSubmit={onHandlePrice}>
        <input
          type="number"
          step="1.0"
          placeholder="New price..."
          value={newPrice}
          onChange={onUpdatePrice}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
