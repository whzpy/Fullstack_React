import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';

const RecipeTable = ({ rows, handleSort, sortConfig, detailHandler, editHandler, deleteHandler, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  // Render pagination
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return (
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div>
    <Table className="table table-striped" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>
            <Button variant="link" onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </th>
          <th style={{ width: '400px' }}>
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
        {currentItems.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.prepTimeMinutes}</td>
            <td>{row.cookTimeMinutes}</td>
            <td>{row.servings}</td>
            <td>{row.difficulty}</td>
            <td>{row.cuisine}</td>
            <td>{row.rating}</td>
            <td><Button type='button' data-tooltip-id="moreTooltip" variant="outline-secondary" onClick={() => detailHandler(row.id)}>More...</Button>
                <Tooltip id="moreTooltip" content = "extra information" place="bottom" effect="solid" />
            </td>
            <td><Button type='button' variant="outline-primary"  onClick={() => editHandler(row.id) }>Edit</Button></td>
            <td><Button type='button' variant="outline-danger"  onClick={() => deleteHandler(row.id) }>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default RecipeTable;