import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const itemsPerPage = 2; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for table
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com" },
    { id: 4, name: "Emily Davis", email: "emily@example.com" },
    { id: 5, name: "Chris Brown", email: "chris@example.com" },
    { id: 6, name: "Jessica Wilson", email: "jessica@example.com" },
    { id: 7, name: "David Martinez", email: "david@example.com" },
    { id: 8, name: "Sarah White", email: "sarah@example.com" },
    { id: 9, name: "James Garcia", email: "james@example.com" },
    { id: 10, name: "Laura Lopez", email: "laura@example.com" }
  ];

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="container mt-4">
      <h1>React Bootstrap Table with Pagination</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

export default App;
