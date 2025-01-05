import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  // Sample data
  const items = [
    "Banana", "Apple", "Cherry", "Mango", "Orange",
    "Pineapple", "Grapes", "Strawberry", "Blueberry", "Peach",
    "Watermelon", "Kiwi", "Lemon", "Papaya", "Plum"
  ];

  // Sorting function
  const sortItems = (order) => {
    let sortedItems = [...items];
    sortedItems.sort();
    if (order === "desc") {
      sortedItems.reverse();
    }
    return sortedItems;
  };

  // Paginate and sort items
  const currentItems = sortItems(sortOrder)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sorting
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Render pagination items
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
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

  return (
    <div className="container mt-4">
      <h1>React Bootstrap Pagination and Sorting</h1>
      <button className="btn btn-primary mb-3" onClick={toggleSortOrder}>
        Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>
      <ul className="list-group mb-4">
        {currentItems.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
      <nav>
        <ul className="pagination justify-content-center">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

export default App;
