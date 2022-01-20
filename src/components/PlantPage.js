import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const[getPlants, setGetPlants]= useState([])
  const[search, setSearch] = useState("")


  useEffect(()=> {
    fetch(" http://localhost:6001/plants")
    .then(res=>res.json())
    .then(data=>setGetPlants(data))
  }, [])

  function handleSubmit(newPlant){
    // setGetPlants([...getPlants, newPlant])
    // the bottom is more stable
    setGetPlants((oldPlants) =>[...oldPlants, newPlant])
  }

  function handleDelete(id){
    const deletedItem = getPlants.filter((plant)=> (
      (plant.id !== id)
    ))
    setGetPlants(deletedItem)
  }

  function handleFilter(searchedValue){
    setSearch(searchedValue)
  }

  function itemsToSearch(){
    const filtering = getPlants.filter((plant)=>(
      plant.name.toLowerCase().includes(search.toLowerCase())
    ))
    return filtering
  }

  function handlePrice(newPlantPrice){
    const updatedPlantArray= getPlants.map((plantObj)=>{
      if(plantObj.id === newPlantPrice.id){
        console.log(newPlantPrice.id)
        return {
          ...plantObj, 
          price: parseInt(newPlantPrice.price)}
      }else{
        return plantObj
      }
    })
    setGetPlants(updatedPlantArray)
  }

  return (
    <main>
      <NewPlantForm handleSubmit={handleSubmit}/>
      <Search search={search} setSearch={setSearch} handleFilter={handleFilter}/>
      <PlantList getPlants={itemsToSearch()} handleDelete= {handleDelete} handlePrice= {handlePrice}/>
    </main>
  );
}

export default PlantPage;
