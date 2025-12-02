// data/products.js

export const initialProducts = [
  {
    id: 1201, 
    image: 'https://images.unsplash.com/photo-1517058869151-246549c4701f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Nebula Flow Laptop Stand', 
    category: 'Office & Desk',
    description: 'Ergonomic, adjustable aluminum laptop stand designed to improve posture and airflow for devices up to 17 inches.', // Changed Description
    specification: 'Aircraft-grade aluminum, multi-angle adjustment, foldable design.',
    rating: 4.6,
    price: 59.99, 
    quantity: 25, 
  },
  {
    id: 1202,
    image: 'https://images.unsplash.com/photo-1543360252-475c61ef765c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Monarch Silk Tie Set', 
    category: 'Apparel', 
    description: 'Luxury three-piece set of silk ties, featuring classic patterns and a premium woven texture.', // Changed Description
    specification: '100% Woven Silk, Standard width (3.15 in), Dry clean only.',
    rating: 4.8, 
    price: 85.00, 
    quantity: 15, 
  },
  {
    id: 1203,
    image: 'https://images.unsplash.com/photo-1577051936306-0335e9821869?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Cast Iron Dutch Oven 6QT', 
    category: 'Home & Kitchen', 
    description: 'Heavy-duty enameled cast iron Dutch oven, perfect for slow cooking, braising, and baking. Great heat retention.', // Changed Description
    specification: '6 Quart capacity, Enameled Cast Iron, Self-basting lid.',
    rating: 4.9, 
    price: 129.99, 
    quantity: 11,
  },
  {
    id: 1204,
    image: 'https://images.unsplash.com/photo-1551632732-1cd77b5a7281?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Hydro-Lok Hydration Pack',
    category: 'Outdoor & Sports', 
    description: 'Lightweight and durable hydration pack with a 2-liter bladder, ideal for cycling, hiking, or running.', // Changed Description
    specification: '2.0 Liter bladder, Padded mesh back panel, Adjustable chest straps.',
    rating: 4.7,
    price: 45.99, 
    quantity: 35,
  },
  {
    id: 1205,
    image: 'https://images.unsplash.com/photo-1549488344-9381e4b85777?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Precision Stylus Pen',
    category: 'Electronics',
    description: 'Active digital stylus with palm rejection and tilt sensitivity for professional drawing and note-taking on tablets.', // Changed Description
    specification: 'Aluminum alloy body, 10-hour battery life, USB-C charging.',
    rating: 4.4, 
    price: 79.00, 
    quantity: 18,
  },
  {
    id: 1206,
    image: 'https://images.unsplash.com/photo-1540306126685-618732e73f4e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Essential Oil Diffuser & Humidifier', 
    category: 'Home Decor', 
    description: 'Ultrasonic aroma diffuser that doubles as a cool mist humidifier, featuring a 7-color LED light system.', // Changed Description
    specification: '400ml water capacity, Auto shut-off, Silent operation.',
    rating: 4.5, 
    price: 29.99, 
    quantity: 42, 
  },
  {
    id: 1207,
    image: 'https://images.unsplash.com/photo-1596463994344-c7885b5d153e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Jade Roller & Gua Sha Set',
    category: 'Beauty & Health', 
    description: 'Natural jade facial massage set used to reduce puffiness, stimulate circulation, and promote lymphatic drainage.', // Changed Description
    specification: '100% natural Jade stone, Dual-ended roller, Includes storage box.',
    rating: 4.9, 
    price: 19.99, 
    quantity: 28, 
  },
  {
    id: 1208,
    image: 'https://images.unsplash.com/photo-1555524388-75101a91a97d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Modular Storage Cube Set (4-Pack)', 
    category: 'Storage & Organization',
    description: 'Collapsible fabric storage cubes with reinforced handles, ideal for shelves, closets, or toy organization.', // Changed Description
    specification: 'Non-woven fabric, 11x11x11 inches (each), Set of 4.',
    rating: 4.3, 
    price: 22.50, 
    quantity: 60, 
  },
  {
    id: 1209, // Changed ID
    image: 'https://images.unsplash.com/photo-1628038755694-2b6d19488a0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Instant Film Camera Mini', 
    category: 'Electronics', 
    description: 'Compact instant camera that prints credit-card sized photos immediately. Features automatic exposure control.', // Changed Description
    specification: 'Fuji film compatible, Built-in flash, Selfie mirror.',
    rating: 4.6, 
    price: 69.95, 
    quantity: 19, 
  },
  {
    id: 1210, 
    image: 'https://images.unsplash.com/photo-1589187775988-c70f8083c683?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Yoga & Pilates Mat', 
    category: 'Fitness', 
    description: 'Thick, non-slip exercise mat offering excellent cushioning for joints. Perfect for yoga, Pilates, and general fitness.', // Changed Description
    specification: '6mm thickness, TPE material, 72x24 inches, Carrying strap included.',
    rating: 4.8, 
    price: 35.00, 
    quantity: 50, 
  },
  {
    id: 1211, 
    image: 'https://images.unsplash.com/photo-1616231922572-1ed499edc397?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Espresso Roast Whole Beans (1lb)', 
    category: 'Food & Drink',
    description: 'One pound of dark roasted, ethically sourced Arabica whole coffee beans, perfect for a rich, bold espresso.', // Changed Description
    specification: '16 oz (454g), Whole Bean, Dark Roast Arabica.',
    rating: 4.5, 
    price: 18.99, 
    quantity: 75, 
  },
];

export default initialProducts;