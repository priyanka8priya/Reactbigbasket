import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ import CSS
import './NonVeg.css';

import { Addtocart } from "./store";

function NonVeg() {
  const dispatch = useDispatch();
  const nonVegProducts = useSelector((state) => state.products?.nonveg || []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(1000);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = nonVegProducts.filter((product) => {
    return product.price <= priceRange;
  });

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
    <div className="nonveg-container">
      <h1 className="nonveg-title">Non-Veg Items</h1>

      {nonVegProducts.length === 0 ? (
        <p className="no-products">No non-veg products available.</p>
      ) : (
        <>
          {/* Price Range Filter */}
          <div className="price-range-container">
            <label className="price-range-label">Price Range</label>
            <div className="range-slider">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="range-input"
              />
            </div>
            <div className="range-values">
              <span>₹0</span>
              <span>₹{priceRange}</span>
              <span>₹1000</span>
            </div>
          </div>

          {/* Product Cards */}
          <ul className="card-grid">
            {currentItems.map((product, index) => (
              <li className="card" key={index}>
                <img src={product.image} alt={product.name} className="nonveg-image" />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>

          <br />

          {/* Pagination */}
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
                className={currentPage === index + 1 ? "active" : ""}
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
        </>
      )}

      <ToastContainer /> {/* ✅ Toast container */}
    </div>
  );
}

export default NonVeg;
