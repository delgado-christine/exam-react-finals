// add-product/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalCart } from '../state/useGlobalCartContext';

const ALL_CATEGORIES = ['Electronics', 'Furniture', 'Home & Kitchen', 'Apparel'];

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useGlobalCart();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: ALL_CATEGORIES[0],
        image: 'https://placehold.co/200x200/5283FF/ffffff?text=New+Product',
        description: '',
    });

    const [message, setMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState(formData.image);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setFormData(prev => ({ ...prev, image: url }));
        setImagePreview(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.quantity) {
            setMessage({ type: 'error', text: 'Please fill in Name, Price, and Quantity.' });
            return;
        }

        const newProduct = {
            ...formData,
            id: Date.now().toString(),
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            isNew: true,
        };

        addProduct(newProduct);

        setMessage({ type: 'success', text: `Product "${newProduct.name}" added to inventory!` });

        setFormData({
            name: '',
            price: '',
            quantity: '',
            category: ALL_CATEGORIES[0],
            image: 'https://placehold.co/200x200/5283FF/ffffff?text=New+Product',
            description: '',
        });

        setImagePreview('https://placehold.co/200x200/5283FF/ffffff?text=New+Product');

        setTimeout(() => {
            router.push('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4">
            <div className="container mx-auto max-w-3xl">
                {/* Enhanced Header */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-3xl blur-2xl opacity-10"></div>
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-700">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Add New Product
                                </h1>
                                <p className="text-slate-400 mt-1">Expand your inventory with new items</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Notice */}
                <div className="mb-6 bg-cyan-500/10 border-l-4 border-cyan-500 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="text-sm font-semibold text-cyan-300">Temporary Storage</p>
                        <p className="text-xs text-cyan-400/80 mt-1">Product data is stored in memory and resets on page refresh.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
                        <div className="space-y-6">

                            {/* Image Preview Section */}
                            <div className="relative">
                                <div className="flex flex-col items-center border-2 border-dashed border-slate-700 p-6 rounded-xl bg-slate-900/50 hover:border-cyan-500/50 transition-colors">
                                    <div className="relative group/image mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover/image:opacity-20 transition-opacity"></div>
                                        <img
                                            src={imagePreview}
                                            alt="Product Preview"
                                            className="relative w-40 h-40 object-cover rounded-xl shadow-lg ring-4 ring-slate-700"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/200x200/334155/94a3b8?text=Image+Error";
                                            }}
                                        />
                                    </div>

                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Product Image URL
                                    </label>

                                    <input
                                        type="url"
                                        name="image"
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image.includes('New+Product') ? '' : formData.image}
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-500"
                                    />
                                </div>
                            </div>

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-500"
                                />
                            </div>

                            {/* Price + Quantity Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Price ($) *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            name="price"
                                            min="0.01"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-8 pr-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Stock Quantity *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="0"
                                            placeholder="0"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-500"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">units</span>
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {ALL_CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Add a detailed description of your product..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 bg-slate-900 text-white border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder-slate-500"
                                ></textarea>
                            </div>

                            {/* Success/Error Message */}
                            {message && (
                                <div
                                    className={`flex items-start gap-3 p-4 rounded-xl font-medium ${
                                        message.type === 'success'
                                            ? 'bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-300'
                                            : 'bg-red-500/10 border-l-4 border-red-500 text-red-300'
                                    }`}
                                >
                                    {message.type === 'success' ? (
                                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <span>{message.text}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Product to Inventory</span>
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            {/* Back Link */}
                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 mt-4 text-cyan-400 hover:text-blue-400 font-semibold text-lg group transition-colors"
                            >
                                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Product List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}