import React, {useState} from "react";

function NewPlantForm({handleSubmit}) {
  const [formData, formDataSetter]= useState({
    name: "",
    image: "",
    price: "",
  })
  function handleOnChange(e){
    const name = e.target.name
    const value= e.target.value
    formDataSetter({
      ...formData,
      [name]:value
    })
  }

  function onHandleSubmit(event){
    event.preventDefault()
    const newPlantObj = {
      name: formData.name,
      image: formData.image,
      price: formData.price
    }
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlantObj)
    })
    .then(res=>res.json())
    .then(data=>handleSubmit(data))
    // handleSubmit(newPlantObj)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit= {onHandleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange= {handleOnChange} value= {formData.name}/>
        <input type="text" name="image" placeholder="Image URL" onChange= {handleOnChange}value= {formData.image}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange= {handleOnChange} value= {formData.price}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

