import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Toastify
import 'react-toastify/dist/ReactToastify.css'; // ✅ Toastify styles
import './vegstyle.css';
import { Addtocart } from './store';

function Chocolate() {
  const dispatch = useDispatch();
  const chocolateProducts = useSelector((state) => state.products.chocolates || []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const priceRanges = [
    { label: '₹0 - ₹50', min: 0, max: 50 },
    { label: '₹51 - ₹150', min: 51, max: 150 },
    { label: '₹151 - ₹250', min: 151, max: 250 },
    { label: '₹251 - ₹350', min: 251, max: 350 },
    { label: '₹351+', min: 351, max: Infinity },
  ];

  const [selectedRanges, setSelectedRanges] = useState(new Set());

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

  const filteredProducts = chocolateProducts.filter((product) => {
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

  // ✅ Toastify action
  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="container">
      <h1>Chocolate Items</h1>

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

      {chocolateProducts.length === 0 ? (
        <p>Chocolate products</p>
      ) : (
        <>
          <ol className="card-grid">
            {currentItems.map((product, index) => (
              <li className="card" key={index}>
                <img src={product.image} alt={product.name} />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </li>
            ))}
          </ol>

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
        </>
      )}

      <ToastContainer /> {/* ✅ Required for Toastify to show notifications */}
    </div>
  );
}

export default Chocolate;
