'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';

import { useGlobalCart } from '../app/state/useGlobalCartContext';

export default function HomePage() {
  // Use the global hook as the source of truth for cart data and functions
  const { 
    products, 
    cart, 
    handleUpdateCart, 
    overallTotal, 
    totalCartItems 
  } = useGlobalCart();

  // State local to HomePage (Product viewing/filtering)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => { 
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (selectedCategory !== 'All') {
        setSelectedCategory('All');
    }
  }, [products.length]); 

  // Req 1: Filter the product list (remains local)
  	const filteredProducts = useMemo(() => {
    // 1. Convert search term to lowercase for case-insensitive matching
    const lowerCaseSearch = searchTerm.toLowerCase();

    // 2. Apply Category Filter
    const categoryFiltered = (selectedCategory === 'All')
      ? products
      : products.filter(product => product.category === selectedCategory);

    // 3. Apply Search Term Filter
    if (!lowerCaseSearch) {
        return categoryFiltered; // Return only category-filtered products if search is empty
    }

    return categoryFiltered.filter(product => 
        // Search by product name OR description
        product.name.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch)
    );
  }, [products, selectedCategory, searchTerm]);
	
	return (
		<>
			<div className="min-h-screen bg-slate-900">
				<div className="container mx-auto p-6 max-w-7xl pb-32">
					{/* Enhanced Header with Add Product Button on Right */}
					<div className="relative mb-8 mt-4">
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-3xl blur-2xl opacity-10"></div>
						<div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-700">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
										</svg>
									</div>
									<div>
										<h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
											Product Management App
										</h1>
										<p className="text-slate-400 text-lg font-medium mt-1">Manage your inventory seamlessly</p>
									</div>
								</div>
								
								{/* Add Product Button */}
								<Link 
									href="/add-product" 
									className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
									</svg>
									Add Product
								</Link>
							</div>
						</div>
					</div>

					{/* Product List Component */}
					<ProductList
						products={filteredProducts}
						cart={cart}
						onUpdateCart={handleUpdateCart}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						onOpenProductDetails={handleOpenProductDetails}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</div>

				{/* Enhanced Fixed Bottom Cart Bar */}
				<div className="fixed bottom-0 left-0 right-0 z-50">
					<div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-cyan-500/30 shadow-2xl backdrop-blur-xl">
						<div className="container mx-auto p-5 max-w-7xl">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</div>
									<div>
										<p className="text-slate-400 text-sm font-medium">Cart Total</p>
										<h2 className="text-3xl font-black text-white">
											<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
												${overallTotal.toFixed(2)}
											</span>
											<span className="text-lg text-slate-400 ml-3 font-normal">
												({totalCartItems} {totalCartItems === 1 ? 'Item' : 'Items'})
											</span>
										</h2>
									</div>
								</div>

								{/* Enhanced Checkout Button */}
								<Link 
									href="/cart" 
									className={`relative py-4 px-10 font-bold rounded-xl shadow-xl transition-all duration-300 overflow-hidden group ${
										totalCartItems > 0 
											? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105' 
											: 'bg-slate-700 text-slate-500 cursor-not-allowed'
									}`}>
									<span className="relative flex items-center gap-2 text-lg">
										{totalCartItems > 0 ? (
											<>
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
												</svg>
												Proceed to Checkout
											</>
										) : (
											<>
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
												</svg>
												Cart Empty
											</>
										)}
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* RENDER PRODUCT MODAL AS A SIBLING */}
			{selectedProduct && (
				<ProductModal 
					product={selectedProduct} 
					onClose={handleCloseProductDetails} 
				/>
			)}
		</>
	);
}
