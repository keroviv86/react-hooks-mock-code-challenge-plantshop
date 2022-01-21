import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [getPlants, getPlantSetter] = useState([])
  const [search, searchSetter]= useState("")

  useEffect(()=>{
    fetch("http://localhost:6001/plants")
    .then(res=>res.json())
    .then(data=> getPlantSetter(data))
  }, [])

  function handleSearch(value){
    searchSetter(value)
  }

  function filterSearch(){
    const filteringItems = getPlants.filter((plant)=>(
      plant.name.toLowerCase().includes(search.toLowerCase())
    ))
    return filteringItems
  }

  function handleSubmit(newPlantObj){
    getPlantSetter((prevPlant)=>[...prevPlant,newPlantObj])
  }

  function handleDelete(id){
    const itemToDelete = getPlants.filter((plant)=>(
      (plant.id !== id)
    ))
    getPlantSetter(itemToDelete)
  }

  function handlePrice(newPrice){
    const updatePrice = getPlants.map((plantObj)=>{
      if(plantObj.id === newPrice.id ){
        return  {
          ...plantObj, 
          price: newPrice.price}
      }else{
        return plantObj
      }
    })
    getPlantSetter(updatePrice)
  }

  return (
    <main>
      <NewPlantForm handleSubmit={handleSubmit}/>
      <Search handleSearch={handleSearch}/>
      <PlantList getPlants= {filterSearch()} handleDelete={handleDelete} handlePrice= {handlePrice}/>
    </main>
  );
}

export default PlantPage;

