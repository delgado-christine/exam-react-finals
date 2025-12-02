import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const ALL_CATEGORIES = ['All', 'Electronics', 'Home Decor', 'Home & Kitchen' , 'Office & Desk' , 'Beauty & Health' , 'Apparel', 'Storage & Organization' , 'Outdoor & Sports'];

export default function ProductList({ 
  products, 
  cart, 
  onUpdateCart, 
  selectedCategory, 
  setSelectedCategory,
  onOpenProductDetails, // This prop is coming from page.js
  searchTerm,
  setSearchTerm,
}) {
  const categories = ALL_CATEGORIES;

  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      // Optional: Reset category to 'All' when search is active for better UX
      if (e.target.value) {
          setSelectedCategory('All');
      }
  };

  function shuffleArray(array) {
  // Create a shallow copy to avoid mutating the original prop array
  const shuffledArray = [...array];
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index before the current element
    const j = Math.floor(Math.random() * (i + 1)); 
    
    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="py-8">

      {/* Search Bar */}
      <div className="mb-8 p-4 text-black bg-white rounded-xl shadow-lg border border-gray-200">
        <input
          type="text"
          placeholder="Search products by name or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-8 mb-8 justify-center p-4 bg-gray-50 rounded-xl shadow-inner">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-6 rounded-full font-semibold transition-all duration-200 shadow-md ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-blue-300 transform scale-[1.05]'
                : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shuffledProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            cartQuantity={cart[product.id] || 0}
            onUpdateCart={onUpdateCart}
            onOpenDetails={onOpenProductDetails} // This passes the function from page.js
          />
        ))}
      </div>
    </div>
  );
}