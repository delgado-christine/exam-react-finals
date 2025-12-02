// cart/page.js
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
// Import the shared state hook
import { useGlobalCart } from '../state/useGlobalCartContext'; 

// Sub-component for a single cart item (stays the same)
const CartItem = ({ item, onUpdateCart }) => {
	// subtotal is now passed in via item.subtotal
	const { id, name, price, cartQuantity, subtotal, image, stockLevel } = item;
	
	const handleQuantityChange = (change) => {
		const newQuantity = cartQuantity + change;
		
		if (newQuantity >= 0 && newQuantity <= stockLevel) {
			onUpdateCart(id, newQuantity);
		}
	};
	
	return (
		<div className="group relative bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
			<div className="flex items-center gap-5">
				{/* Image */}
				<div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden shadow-md ring-2 ring-slate-700 group-hover:ring-cyan-500/50 transition-all">
					<img 
						src={image} 
						alt={name} 
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
						onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/112x112/334155/94a3b8?text=Product"; }}
					/>
				</div>

				{/* Details and Price */}
				<div className="grow">
					<Link href={`/product/${id}`} legacyBehavior>
						<a className="text-xl font-bold text-white hover:text-cyan-400 transition-all">
							{name}
						</a>
					</Link>
					<div className="flex items-center gap-2 mt-2">
						<span className="text-sm text-slate-400 font-medium">Unit Price:</span>
						<span className="text-lg font-semibold text-slate-300">${price.toFixed(2)}</span>
					</div>
					{stockLevel < 5 && (
						<div className="flex items-center gap-2 mt-2 bg-amber-500/10 px-3 py-1.5 rounded-lg w-fit border border-amber-500/20">
							<svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
							<span className="text-xs text-amber-400 font-semibold">Only {stockLevel} left!</span>
						</div>
					)}
				</div>

				{/* Quantity Controls and Subtotal */}
				<div className="flex items-center gap-6">
					<div className="flex items-center bg-slate-900 rounded-xl shadow-sm border border-slate-700">
						<button 
							onClick={() => handleQuantityChange(-1)} 
							className="p-3 hover:bg-red-500/20 rounded-l-xl text-xl font-bold text-slate-300 hover:text-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
							disabled={cartQuantity <= 0}
						>
							−
						</button>
						<span className="px-5 text-xl font-bold text-white border-l border-r border-slate-700 min-w-[60px] text-center">
							{cartQuantity}
						</span>
						<button 
							onClick={() => handleQuantityChange(1)} 
							className={`p-3 rounded-r-xl text-xl font-bold transition-all ${
								cartQuantity >= stockLevel 
									? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
									: 'text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400'
							}`}
							disabled={cartQuantity >= stockLevel}
						>
							+
						</button>
					</div>
					
					<div className="text-right min-w-[120px]">
						<p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							${subtotal.toFixed(2)}
						</p>
						<button 
							onClick={() => onUpdateCart(id, 0)} 
							className="text-sm text-slate-400 hover:text-red-400 mt-2 font-medium hover:underline transition-colors flex items-center gap-1 ml-auto"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};


export default function CartPage() {
	// Replaced useMockCartState with useGlobalCart
	const { 
		cartItemsData: cartItems, // Use the pre-computed cart items list
		handleUpdateCart, 
		overallTotal, // Total is computed in the hook
		totalCartItems 
	} = useGlobalCart(); // This hook now holds the actual user's cart state


	const handleCheckout = () => {
		alert("Proceeding to Checkout! Total: $" + overallTotal.toFixed(2));
	};
	
	if (totalCartItems === 0) {
		return (
			<div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
				<div className="text-center max-w-2xl">
					<div className="relative mb-8">
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20"></div>
						<div className="relative w-48 h-48 mx-auto bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border border-slate-700">
							<svg className="w-24 h-24 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
							</svg>
						</div>
					</div>
					
					<h1 className="text-5xl font-black text-white mb-4">Your Cart is Empty</h1>
					<p className="text-xl text-slate-400 mb-10">Looks like you haven't added anything to your cart yet. Start exploring!</p>
					
					<Link href="/" legacyBehavior>
						<a className="inline-flex items-center gap-3 py-4 px-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Start Shopping
						</a>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900 py-8">
			<div className="container mx-auto p-6 max-w-7xl">
				{/* Enhanced Header */}
				<div className="mb-10">
					<div className="flex items-center gap-4 mb-2">
						<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
							<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Shopping Cart
						</h1>
					</div>
					<p className="text-xl text-slate-400 ml-16">
						<span className="font-bold text-white">{totalCartItems}</span> {totalCartItems === 1 ? 'Item' : 'Items'} in your cart
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-5">
						{cartItems.map(item => (
							<CartItem key={item.id} item={item} onUpdateCart={handleUpdateCart} />
						))}
						
						<Link href="/" legacyBehavior>
							<a className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-blue-400 font-semibold text-lg group transition-colors">
								<svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								Continue Shopping
							</a>
						</Link>
					</div>

					{/* Enhanced Summary/Checkout Panel */}
					<div className="lg:col-span-1 h-fit sticky top-8">
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
							<div className="relative bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
								<h2 className="text-3xl font-black text-white mb-6 pb-4 border-b-2 border-slate-700">
									Order Summary
								</h2>
								
								<div className="space-y-5 text-lg">
									<div className="flex justify-between items-center">
										<span className="text-slate-400 font-medium">
											Subtotal ({totalCartItems} {totalCartItems === 1 ? 'item' : 'items'})
										</span>
										<span className="text-xl font-bold text-white">${overallTotal.toFixed(2)}</span>
									</div>
									
									<div className="flex justify-between items-center">
										<span className="text-slate-400 font-medium">Shipping</span>
										<div className="flex items-center gap-2">
											<svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
											<span className="text-emerald-400 font-bold">FREE</span>
										</div>
									</div>
									
									<div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-dashed border-slate-700">
										<span className="text-xl font-bold text-white">Total</span>
										<span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
											${overallTotal.toFixed(2)}
										</span>
									</div>
									
									<p className="text-sm text-slate-500 text-center pt-2">Including VAT</p>
								</div>
								
								<button 
									onClick={handleCheckout}
									className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
								>
									<span>Proceed to Checkout</span>
									<svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</button>
								
								<div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-400">
									<div className="flex items-center gap-2">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
										<span>Secure Checkout</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}