// components/ProductCard.jsx
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductCard({
	product,
	cartQuantity,
	onUpdateCart,
	onOpenDetails,
}) {
	const { id, name, price, quantity: stockLevel, image } = product;

	const [stagedQuantity, setStagedQuantity] = useState(1); 
	
	useEffect(() => {
		if (cartQuantity > 0) {
			setStagedQuantity(cartQuantity);
		} else {
			setStagedQuantity(1);
		}
	}, [cartQuantity]);

	const subtotal = price * stagedQuantity;
	const isLowStock = stockLevel < 5;

	const handleStagedQuantityChange = (change) => {
		const newQuantity = stagedQuantity + change;
		if (newQuantity >= 1 && newQuantity <= stockLevel) {
			setStagedQuantity(newQuantity);
		}
	};

	const handleAddToCartClick = () => {
		if (stagedQuantity >= 1 && stagedQuantity <= stockLevel) {
			onUpdateCart(id, stagedQuantity);
		}
	};
	
	const handleRemoveFromCart = () => {
		onUpdateCart(id, 0);
	};

	return (
		<div className="group relative bg-slate-800 rounded-2xl shadow-lg border border-slate-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 p-5 flex flex-col">
			{/* Gradient overlay on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

			{/* Image Section */}
			<div 
				className="relative w-full cursor-pointer mb-4 z-10"
				onClick={() => onOpenDetails(product)}
			>
				<div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-slate-700 group-hover:border-cyan-500/50 transition-all">
					<img 
						src={image} 
						alt={`Feature image of ${name}`} 
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/192x192/334155/94a3b8?text=No+Image"; }}
					/>
					{/* Hover Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
						<div className="flex items-center gap-2 bg-cyan-500/90 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
							View Details
						</div>
					</div>
				</div>
			</div>

			{/* Product Info Section */}
			<div className="relative z-10 flex flex-col flex-grow">
				{/* Product Name */}
				<h4 className="text-lg font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-cyan-400 transition-colors">
					{name}
				</h4>

				{/* Price and Stock Badge Row */}
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-baseline gap-1">
						<span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							${price.toFixed(2)}
						</span>
					</div>
					
					{/* Stock Badge */}
					{isLowStock && stockLevel > 0 && (
						<div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/50 px-2 py-1 rounded-lg">
							<svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
							<span className="text-xs font-bold text-amber-400">{stockLevel} left</span>
						</div>
					)}

					{stockLevel === 0 && (
						<div className="bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-lg">
							<span className="text-xs font-bold text-red-400">OUT OF STOCK</span>
						</div>
					)}
				</div>

				{/* Quantity Controls */}
				<div className="flex items-center justify-center gap-3 mb-4 bg-slate-900/50 rounded-xl p-3 border border-slate-700">
					<button
						onClick={cartQuantity > 0 ? handleRemoveFromCart : () => handleStagedQuantityChange(-1)}
						className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg transition-all ${
							cartQuantity > 0 
								? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' 
								: 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-600'
						}`}
						disabled={cartQuantity === 0 && stagedQuantity <= 1}
					>
						{cartQuantity > 0 ? '×' : '−'}
					</button>

					<div className="flex flex-col items-center">
						<span className="font-black text-2xl text-white min-w-[3rem] text-center">
							{stagedQuantity}
						</span>
						<span className="text-xs text-slate-400 font-medium">qty</span>
					</div>

					<button
						onClick={() => handleStagedQuantityChange(1)}
						className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg transition-all ${
							stagedQuantity >= stockLevel || stockLevel === 0
								? 'bg-slate-700 text-slate-500 border border-slate-600 cursor-not-allowed'
								: 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/50'
						}`}
						disabled={stagedQuantity >= stockLevel || stockLevel === 0}
					>
						+
					</button>
				</div>

				{/* Subtotal */}
				<div className="mb-4 text-center">
					<span className="text-sm text-slate-400 font-medium">Subtotal: </span>
					<span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
						${subtotal.toFixed(2)}
					</span>
				</div>

				{/* Add/Update Button */}
				<button
					onClick={handleAddToCartClick}
					className={`w-full py-3 font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
						cartQuantity === 0 
							? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-emerald-500/50 hover:scale-[1.02]" 
							: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50 hover:scale-[1.02]"
					}`}
					disabled={stockLevel === 0 || stagedQuantity === cartQuantity}
				>
					{cartQuantity === 0 ? (
						<>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
							</svg>
							Add {stagedQuantity} to Cart
						</>
					) : (
						<>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Update to {stagedQuantity}
						</>
					)}
				</button>

				{/* Status Messages */}
				<div className="mt-3 min-h-[1.5rem]">
					{stagedQuantity >= stockLevel && stockLevel > 0 && (
						<div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-semibold">
							<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
							Maximum stock reached
						</div>
					)}
					{cartQuantity > 0 && stagedQuantity < cartQuantity && (
						<div className="flex items-center justify-center gap-1 text-xs text-orange-400 font-semibold">
							<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
							</svg>
							Click Update to reduce quantity
						</div>
					)}
				</div>
			</div>
		</div>
	);
}