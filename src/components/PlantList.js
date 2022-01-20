import React from "react";
import PlantCard from "./PlantCard";

function PlantList({getPlants, handleDelete, handlePrice}) {
  const plantsToDisplay = getPlants.map((plant)=>(
    <PlantCard 
      key = {plant.id}
      id = {plant.id}
      name = {plant.name}
      image = {plant.image}
      price= {plant.price}
      handleDelete = {handleDelete}
      handlePrice = {handlePrice}
    />
  ))


  return (
    <ul className="cards">{plantsToDisplay}</ul>
  );
}

export default PlantList;
