import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-tooltip/dist/react-tooltip.css';
import DetailsComp from './components/DetailsComp'
import EditSaveComp from './components/EditSaveComp'
import SearchBar from './components/SearchBar'
import RecipeModal from './components/RecipeModal';
import RecipeTable from './components/RecipeTable';
import NavBarComp from './components/NavBarComp';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [rows, setRows] = useState([])
  const [details, setDetails] = useState(null)
  const [editsave, setEditsave] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 
  const [addNewRecipe, setAddNewRecipe] = useState(null)

  // Fetch data from API
  useEffect(() => {
    let localStatus = localStorage.getItem("recipeData")
    if(!localStatus){
      fetch("https://dummyjson.com/recipes")
      .then(result => result.json())
      .then(json => {setRows(json.recipes);
        localStorage.setItem('recipeData', JSON.stringify(json.recipes));
      })
    } else {
      setRows(JSON.parse(localStatus));
    }
  }, [])

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    const sortedData = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setRows(sortedData);
  };

  // Details - extra information
  const detailHandler = (id) =>{
    let detailsItem = rows.filter(item => item.id === id)
    let extraDetail = {
      "ingredients": detailsItem[0].ingredients,
      "instructions": detailsItem[0].instructions,
      "tags": detailsItem[0].tags,
      "reviewCount": detailsItem[0].reviewCount,
      "mealType": detailsItem[0].mealType,
    }
    setDetails(extraDetail)
  }

  // Search
  const searchHandler = (e) => {
    let inputText = e.target.value.toLowerCase();
    if (inputText === '') {
      window.location.reload()
    }
    const filtered = rows.filter(recipe =>
      recipe.name.toLowerCase().includes(inputText) ||
      recipe.prepTimeMinutes.toString().includes(inputText) ||
      recipe.cookTimeMinutes.toString().includes(inputText) ||
      recipe.servings.toString().includes(inputText) ||
      recipe.difficulty.toLowerCase().includes(inputText) ||
      recipe.cuisine.toLowerCase().includes(inputText) ||
      recipe.rating.toString().includes(inputText) ||
      recipe.id.toString().includes(inputText)
    );
    setRows(filtered);
  };

  // Add new recipe
  const addHandler = () => {
    console.log("rows - ", rows)
    handleShow()
  };
  const addNewRecipeHandler = (newRecipe) => {
    newRecipe.id = uuidv4()
    // console.log("newRecipe: ", newRecipe)
    setAddNewRecipe(newRecipe)
    let newObj = [...rows, newRecipe]
    setRows(newObj)
    localStorage.setItem('recipeData', JSON.stringify(newObj));
  }

  // Edit and Save
  const editHandler = (id) => {
    let editItem = rows.filter(item => item.id === id)
    setEditsave(editItem[0])
  }

  // Delete
  const deleteHandler = (id) => {
    // console.log("delete _id: ", id)
    let newObj = rows.filter(item => item.id !== id)
    setRows(newObj)
    localStorage.setItem('recipeData', JSON.stringify(newObj));
    window.location.reload()
  }
      
  // Save
  const saveHandler = (updatedData) => {
  // console.log("updatedData: ", updatedData);
  let newObj = rows.splice(updatedData.id -1, 1, updatedData)
  setRows(newObj)
  localStorage.setItem('recipeData', JSON.stringify(rows));
  window.location.reload()
  }

  if(details){
    return (
    <DetailsComp 
      ingredients =  {details.ingredients}
      instructions =  {details. instructions}
      tags =  {details.tags}
      reviewCount =  {details.reviewCount}
      mealType =  {details.mealType}
    />)
  } else if(editsave){
    return (
    <EditSaveComp 
      editdata = {editsave}
      saveHandler = {saveHandler}
    />)
  } else {
    return (
      <div >
        <NavBarComp />
        <h2>Recipe List with Additional Information __ {new Date().toLocaleDateString()} </h2> 
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchBar searchHandler={searchHandler} />
            <Button variant="success" style={{ marginTop: '10px' }} onClick={() => addHandler()}>
              Add New Recipe
            </Button>
        </div> 
        <RecipeModal show = {show} handleClose = {handleClose} addNewRecipeHandler = {addNewRecipeHandler} />
        <RecipeTable
          rows={rows}
          handleSort={handleSort}
          sortConfig={sortConfig}
          detailHandler={detailHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          itemsPerPage={10}
        />
      </div>
    )
  }
}

export default App
