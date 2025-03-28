import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './DisplayItem.css';
import { useNavigate } from 'react-router-dom';

function DisplayDogItem() {
  const context = useContext(DataContext);
  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState('all');


  if (!context) {
    return <p>Context not available</p>;
  }

  const { data, error } = context;

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

 
  const filteredProducts = data
    .filter(product => product.category === 'dog')
    .filter(product => {
      if (filterOption === 'toy') {
        return product.productName.toLowerCase().includes('toy');
      } else if (filterOption === 'food') {
        return product.productName.toLowerCase().includes('food');
      }else if (filterOption === 'bed') {
        return product.productName.toLowerCase().includes('bed');
      } else {
        return true; 
      }
    });

  return (
    <div className="top-products">
      <h2>OUR PRODUCTS</h2>

      {/* Filter Selection */}
      <div className="filter-box">
        <label htmlFor="productFilter">Filter by:</label>
        <select id="productFilter" value={filterOption} onChange={handleFilterChange}>
          <option value="all">All </option>
          <option value="toy">Toy</option>
          <option value="food">Food</option>
          <option value="bed">Bed</option>

        </select>
      </div><br/>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.key&&product.id} className="product-card">
              {product.title==='Offer'? <div className="offer-tag">Offer</div>:""}
              <img
                src={product.src}
                alt={product.productName}
                onClick={() => navigate(`/productdetails/${product.id}`)}
              />
              <p>{product.productName}</p>
              <p className="price">{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found for the selected filter.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayDogItem;
