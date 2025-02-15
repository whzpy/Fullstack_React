import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-tooltip/dist/react-tooltip.css';
import ExtraInfo from './components/ExtraInfo'
import Edit from './components/Edit'
import SearchBar from './components/SearchBar'
import RecipeModal from './components/RecipeModal';
import RecipeTable from './components/RecipeTable';
import NavBar from './components/NavBar';
import Workflow from './components/Workflow';
import About from './components/About';
import Contact from './components/Contact';
import SignupPage from './components/Signup';
import LoginPage from './components/Login';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [rows, setRows] = useState([])
  const [details, setDetails] = useState(null)
  const [editsave, setEditsave] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); 
  const itemsPerPage = 10; // row number per page

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

  // Details - extra info
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
    handleShow()
  };
  const addNewRecipeHandler = (newRecipe) => {
    newRecipe.id = uuidv4()
    // console.log("newRecipe: ", newRecipe)
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

   // Signup - username, email, and password SAVE to FastAPI-database
  const signupDataHandler = async (signupData) => { 
    const url = "http://127.0.0.1:8000/auth/create-user"

    let signupDataDB = {
      "username": signupData.username,
      "first_name": "string",
      "last_name": "string",
      "email": signupData.email,
      "password": signupData.password,
      "role": "user"
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupDataDB)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Signup data submitted successfully:", result);
    } catch (error) {
      console.error("Error posting data to db:", error);
    }
   }

  // Login - to FastAPI-database for authentication and JWT token (response)
  const loginDataHandler = async (loginData) => { 
     const url = "http://127.0.0.1:8000/auth/login"
     
    let loginDataDB = {
      "username": loginData.username,
      "password": loginData.password
    }
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(loginDataDB)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login data submitted successfully:", result);
    } catch (error) {
      console.error("Error login posting data to db:", error);
    }
   }

  if(details){
    return (
    <ExtraInfo 
      ingredients =  {details.ingredients}
      instructions =  {details. instructions}
      tags =  {details.tags}
      reviewCount =  {details.reviewCount}
      mealType =  {details.mealType}
    />)
  } else if(editsave){
    return (
    <Edit 
      editdata = {editsave}
      saveHandler = {saveHandler}
    />)
  } else {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Workflow />} />
          <Route 
            path="/recipes" 
            element={
              <div style={{ marginTop: '15px' }}>
                <h2 style={{ marginBottom: '5px' }} >Recipe List with Additional Information __ {new Date().toLocaleDateString()} </h2> 
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
                  itemsPerPage={itemsPerPage}
                />
              </div>
            } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupPage signupDataHandler = {signupDataHandler} />} />
          <Route path="/login" element={<LoginPage loginDataHandler = {loginDataHandler} />} />
        </Routes>
      </div>
    )
  }
}

export default App
