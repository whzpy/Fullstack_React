import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DetailsComp from './DetailsComp'
import EditSaveComp from './EditSaveComp'

function App() {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // for sorting

  const [rows, setRows] = useState([])
  const [details, setDetails] = useState(null)
  const [editsave, setEditsave] = useState(null)

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

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  // Function to handle sorting
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

const searchHandler = (e) => {
  let inputText = e.target.value;
  if (inputText === '') {
    window.location.reload()
  }
  const filtered = rows.filter(recipe =>
    recipe.name.toLowerCase().includes(inputText.toLowerCase())
  );
  setRows(filtered);
};


const addHandler = () => {
   console.log("Add a new recipe ")
   handleShow()

  // const newRecipe = {
  //   id: rows.length + 1,
  //   name: 'New Recipe',
  //   ingredients: [],
  //   instructions: [],
  //   prepTimeMinutes,
  //   cookTimeMinutes,
  //   servings,
  //   difficulty,
  //   cuisine,
  //   caloriesPerServing,
  //   tags: [],
  //   userId,
  //   rating,
  //   image,
  //   mealType: '',
  //   reviewCount: 0
  // };
  // const newRows = [...rows, newRecipe];
  // setRows(newRows);
  // localStorage.setItem('recipeData', JSON.stringify(newRows));
  // window.location.reload();

};

const editHandler = (id) => {
  let editItem = rows.filter(item => item.id === id)
  setEditsave(editItem[0])
}

const deleteHandler = (id) => {
  console.log("delete _id: ", id)
  let newObj = rows.filter(item => item.id !== id)
  setRows(newObj)
  localStorage.setItem('recipeData', JSON.stringify(newObj));
  window.location.reload()
}
    
const saveHandler = (updatedData) => {
console.log("updatedData: ", updatedData);
let newObj = rows.splice(updatedData.id -1, 1, updatedData)
setRows(newObj)
localStorage.setItem('recipeData', JSON.stringify(rows));
console.log("rows - new - ", rows)
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
    <div>
      <h2>Recipe List with Additional Information __ {new Date().toLocaleDateString()} </h2> 

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="search-container" style={{  marginTop: '10px', marginLeft: '648px', marginRight: '15px',display: 'flex', alignItems: 'center' }}>
          <input 
          type="text" 
          placeholder="Search for recipes by name ..." 
          className="form-control" style={{ width: '400px' }}  
          onChange={(e) => searchHandler(e)} 
          />
        </div>  
        <div>
          <Button variant="success" style={{ marginTop: '10px' }} onClick={() => addHandler()}>
            Add New Recipe
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              TODOs
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Table className="table table-striped">
      <thead>
        <tr>
          <th>
            <Button variant="link" onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('prepTimeMinutes')}>
              prepTimeMinutes {sortConfig.key === 'prepTimeMinutes' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('cookTimeMinutes')}>
              cookTimeMinutes {sortConfig.key === 'cookTimeMinutes' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('servings')}>
              Servings {sortConfig.key === 'servings' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('difficulty')}>
              Difficulty {sortConfig.key === 'difficulty' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('cuisine')}>
              Cuisine {sortConfig.key === 'cuisine' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th>
            <Button variant="link" onClick={() => handleSort('rating')}>
              Rating {sortConfig.key === 'rating' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th> Details</th>
          <th> Edit</th>
          <th> Delete</th>
          
        </tr>
      </thead>
      <tbody>
        {currentItems.map(ele =>
          <tr key = {ele.id} >
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.prepTimeMinutes}</td>
            <td>{ele.cookTimeMinutes}</td>
            <td>{ele.servings}</td>
            <td>{ele.difficulty}</td>
            <td>{ele.cuisine}</td>
            <td>{ele.rating}</td>
            <td><Button type='button'  className="btn btn-light" onClick={() => detailHandler(ele.id)}>Details</Button></td>
            <td><Button type='button' className="btn btn-info"  onClick={() => editHandler(ele.id) }>Edit</Button></td>
            <td><Button type='button' className="btn btn-warning"  onClick={() => deleteHandler(ele.id) }>Delete</Button></td>
          </tr>)
        }
      </tbody>
      </Table>
      <nav>
        <ul className="pagination justify-content-center">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  )
}
}
export default App
