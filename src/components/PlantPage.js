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
    setGetPlants([...getPlants, newPlant])
    console.log(getPlants)
  }

  function handleDelete(id){
    const deletedItem = getPlants.filter((plant)=> (
      (plant.id !== id)
    ))
    setGetPlants(deletedItem)
  }

  function handleFilter(searchedValue){
    setSearch(searchedValue)
    console.log(search)
  }

  function itemsToSearch(){
    const filtering = getPlants.filter((plant)=>(
      plant.name.toLowerCase().includes(search)
    ))
    return filtering
  }

  return (
    <main>
      <NewPlantForm handleSubmit={handleSubmit}/>
      <Search search={search} setSearch={setSearch} handleFilter={handleFilter}/>
      <PlantList getPlants={itemsToSearch()} handleDelete= {handleDelete}/>
    </main>
  );
}

export default PlantPage;
