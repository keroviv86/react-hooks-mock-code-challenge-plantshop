import React, {useState} from "react";

function NewPlantForm({handleSubmit}) {
  const [name, setName] = useState("")
  const [image, setImage]= useState("")
  const[price, setPrice]= useState("")

  function onChangeName(e){
    setName(e.target.value)
  }

  function onChangeImage(e){
    setImage(e.target.value)
  }

  function onChangePrice(e){
    setPrice(e.target.value)
  }

  function onHandleSubmit(event){
    event.preventDefault()
    const newObj={
      name: name,
      image:image,
      price:price
    }
    fetch("http://localhost:6001/plants",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newObj)
    })
    .then(res=>res.json())
    .then(handleSubmit(newObj))
    setName("")
    setImage("")
    setPrice("")
  }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onHandleSubmit}>
        <input onChange={onChangeName} type="text" name="name" placeholder="Plant name" value= {name}/>
        <input onChange={onChangeImage}type="text" name="image" placeholder="Image URL" value={image}/>
        <input onChange={onChangePrice}type="number" name="price" step="0.01" placeholder="Price" value={price}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
