import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Addtocart } from './store';
import { toast, ToastContainer } from 'react-toastify'; // ✅ import toast
import 'react-toastify/dist/ReactToastify.css'; // ✅ import CSS
import './vegstyle.css';

function Veg() {
  const vegProducts = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const priceRanges = [
    { label: '₹0 - ₹100', min: 0, max: 100 },
    { label: '₹101 - ₹200', min: 101, max: 200 },
    { label: '₹201 - ₹300', min: 201, max: 300 },
    { label: '₹301 - ₹400', min: 301, max: 400 },
    { label: '₹401+', min: 401, max: Infinity },
  ];

  const [selectedRanges, setSelectedRanges] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePriceFilterChange = (range, isChecked) => {
    setSelectedRanges((prev) => {
      const updated = new Set(prev);
      if (isChecked) {
        updated.add(range);
      } else {
        updated.delete(range);
      }
      return updated;
    });
  };

  const filteredProducts = vegProducts.filter((product) => {
    return (
      selectedRanges.size === 0 ||
      Array.from(selectedRanges).some(
        (range) => product.price >= range.min && product.price <= range.max
      )
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="veg-container">
      <h1 className="veg-title"> Veg Items</h1>

      <div className="filters">
        {priceRanges.map((range) => (
          <label key={range.label}>
            <input
              type="checkbox"
              onChange={(e) =>
                handlePriceFilterChange(range, e.target.checked)
              }
            />
            {range.label}
          </label>
        ))}
      </div>

      <ul className="card-grid">
        {currentItems.map((product, index) => (
          <li key={index} className="card">
            <img src={product.image} alt={product.name} className="veg-image" />
            <div className="card-content">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(pageCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>

      <ToastContainer /> {/* ✅ Toast container */}
    </div>
  );
}

export default Veg;
