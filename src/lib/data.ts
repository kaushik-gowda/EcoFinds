
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import type { Order, Product, Review } from './types';

const initialProducts: Omit<Product, 'id'>[] = [
    {
    name: 'Organic Cotton Tee',
    description: 'Soft, breathable, and eco-friendly.',
    longDescription: 'Crafted from 100% organic cotton, this t-shirt offers both comfort and style. Its classic crew-neck design and relaxed fit make it a versatile staple for any wardrobe. Available in a range of neutral colors to complement any outfit.',
    price: 24.99,
    images: [],
    category: 'Apparel',
    reviews: [
      { id: 'r1', author: 'Jane D.', rating: 5, comment: 'Incredibly soft and fits perfectly!', date: '2023-05-20' },
      { id: 'r2', author: 'John S.', rating: 4, comment: 'Great quality, but wish it came in more colors.', date: '2023-05-18' },
    ],
    stock: 50,
    userId: 'defaultUser',
  },
   {
    name: 'Linen Button-Down Shirt',
    description: 'Lightweight and perfect for summer.',
    longDescription: 'Stay cool and stylish with our 100% linen button-down shirt. The breathable fabric and relaxed fit make it an ideal choice for warm weather, whether you\'re on vacation or enjoying a casual weekend.',
    price: 69.99,
    images: [],
    category: 'Apparel',
    stock: 30,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Versatile and comfortable for any occasion.',
    longDescription: 'Our slim fit chinos are a modern wardrobe essential. Made from a comfortable stretch cotton twill, they offer a sharp, tailored look without sacrificing comfort. Dress them up with a blazer or down with a tee.',
    price: 79.99,
    images: [],
    category: 'Apparel',
    stock: 40,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Minimalist Leather Wallet',
    description: 'Slim, stylish, and built to last.',
    longDescription: 'Our minimalist wallet is designed for the modern individual. Made from full-grain leather, it features a slim profile that fits comfortably in your pocket, with enough room for your essential cards and cash. The leather will develop a beautiful patina over time.',
    price: 49.99,
    images: [],
    category: 'Accessories',
    reviews: [
      { id: 'r3', author: 'Alex R.', rating: 5, comment: 'The perfect wallet. Slim and holds everything I need.', date: '2023-06-01' },
    ],
    stock: 30,
    userId: 'defaultUser',
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Durable, spacious, and versatile.',
    longDescription: 'Our canvas tote is the ultimate carry-all. Made from heavy-duty cotton canvas, it\'s strong enough to carry your groceries, books, or beach essentials. Features an interior pocket for your keys and phone.',
    price: 39.99,
    images: [],
    category: 'Accessories',
    reviews: [
       { id: 'r9', author: 'Jessica P.', rating: 5, comment: 'My go-to bag for everything. It\'s so sturdy!', date: '2023-06-02' },
    ],
    stock: 45,
    userId: 'defaultUser',
  },
   {
    name: 'Classic Aviator Sunglasses',
    description: 'Timeless style with UV protection.',
    longDescription: 'These classic aviator sunglasses feature a lightweight metal frame and polarized lenses that provide 100% UV protection. A timeless accessory that adds a cool factor to any look.',
    price: 89.99,
    images: [],
    category: 'Accessories',
    stock: 50,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound, all-day comfort.',
    longDescription: 'Escape into your music with our advanced noise-cancelling headphones. Enjoy crystal-clear audio, deep bass, and up to 30 hours of playtime on a single charge. The plush earcups and lightweight design ensure comfortable listening for hours on end.',
    price: 199.99,
    images: [],
    category: 'Electronics',
    reviews: [
      { id: 'r7', author: 'David L.', rating: 5, comment: 'The noise cancelling is incredible. Great for travel.', date: '2023-05-28' },
      { id: 'r8', author: 'Chloe T.', rating: 4, comment: 'Sound quality is great, but they are a bit pricey.', date: '2023-05-30' },
    ],
    stock: 20,
    userId: 'defaultUser',
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Big sound in a small package.',
    longDescription: 'Take your music anywhere with this compact and powerful Bluetooth speaker. It\'s waterproof, dustproof, and has a 12-hour battery life, making it perfect for beach days, hikes, or just relaxing at home.',
    price: 59.99,
    images: [],
    category: 'Electronics',
    stock: 60,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Smartwatch Fitness Tracker',
    description: 'Track your health and stay connected.',
    longDescription: 'This sleek smartwatch tracks your steps, heart rate, sleep, and workouts. It also displays notifications from your phone, so you can stay connected without pulling out your device. Features a vibrant AMOLED display.',
    price: 149.99,
    images: [],
    category: 'Electronics',
    stock: 35,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Artisan Roasted Coffee',
    description: 'A rich and smooth medium roast.',
    longDescription: 'Start your day with our signature blend of artisan roasted coffee. Sourced from the highlands of Colombia, these beans are medium-roasted to bring out notes of chocolate, caramel, and citrus. Perfect for any brewing method.',
    price: 18.99,
    images: [],
    category: 'Home Goods',
    reviews: [
      { id: 'r6', author: 'Emily W.', rating: 5, comment: 'My new favorite coffee! So smooth.', date: '2023-06-05' },
    ],
    stock: 75,
    userId: 'defaultUser',
  },
  {
    name: 'Soy Wax Scented Candle',
    description: 'Sandalwood & Vanilla scent.',
    longDescription: 'Create a calming atmosphere with our hand-poured soy wax candle. The warm and inviting scent of sandalwood and vanilla is perfect for unwinding after a long day. Burns cleanly for over 50 hours.',
    price: 29.99,
    images: [],
    category: 'Home Goods',
    reviews: [],
    stock: 60,
    userId: 'defaultUser',
  },
  {
    name: 'Modern Ceramic Planter',
    description: 'A stylish home for your favorite plant.',
    longDescription: 'Give your plants a beautiful home with our modern ceramic planter. Its clean lines and matte finish complement any decor style. Includes a drainage hole and optional saucer to protect your surfaces.',
    price: 44.99,
    images: [],
    category: 'Home Goods',
    reviews: [],
    stock: 35,
    userId: 'defaultUser',
  },
  {
    name: 'Insulated Water Bottle',
    description: 'Keeps drinks cold for 24 hours.',
    longDescription: 'Stay hydrated on the go with our stainless steel insulated water bottle. Featuring double-wall vacuum insulation, it keeps your drinks ice-cold for 24 hours or hot for 12. The leak-proof lid and durable powder-coat finish make it the perfect companion for any adventure.',
    price: 34.99,
    images: [],
    category: 'Lifestyle',
    reviews: [
      { id: 'r4', author: 'Sarah K.', rating: 5, comment: 'Best water bottle I have ever owned!', date: '2023-04-12' },
      { id: 'r5', author: 'Mike B.', rating: 5, comment: 'Doesn\'t leak and keeps water cold all day long.', date: '2023-04-15' },
    ],
    stock: 100,
    userId: 'defaultUser',
  },
  {
    name: 'Travel Journal',
    description: 'Document your adventures.',
    longDescription: 'A beautifully crafted journal with a durable cover and high-quality paper, perfect for writing, sketching, and preserving memories from your travels.',
    price: 22.99,
    images: [],
    category: 'Lifestyle',
    stock: 80,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Natural Lip Balm',
    description: 'Hydrating and nourishing lip care.',
    longDescription: 'Made with beeswax, shea butter, and vitamin E, our natural lip balm soothes and protects your lips.',
    price: 7.99,
    images: [],
    category: 'Beauty',
    stock: 150,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Vitamin C Serum',
    description: 'Brightening and anti-aging.',
    longDescription: 'A potent Vitamin C serum that helps to brighten skin tone, reduce fine lines, and protect against environmental damage. Formulated with hyaluronic acid for extra hydration.',
    price: 38.00,
    images: [],
    category: 'Beauty',
    stock: 60,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly and non-slip.',
    longDescription: 'Perfect your poses on this durable, eco-friendly yoga mat. Made from natural tree rubber, it provides excellent grip and cushioning.',
    price: 69.99,
    images: [],
    category: 'Sports & Outdoors',
    stock: 40,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Resistance Bands Set',
    description: 'For strength training and physical therapy.',
    longDescription: 'A set of five resistance bands with varying levels of resistance, perfect for home workouts, stretching, and rehabilitation exercises. Includes a carrying bag.',
    price: 19.99,
    images: [],
    category: 'Sports & Outdoors',
    stock: 120,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'The Great Gatsby',
    description: 'A classic novel by F. Scott Fitzgerald.',
    longDescription: 'The quintessential novel of the Jazz Age, The Great Gatsby is a timeless story of obsession, decadence, and the American Dream.',
    price: 12.99,
    images: [],
    category: 'Books',
    stock: 100,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Sapiens: A Brief History of Humankind',
    description: 'A captivating account of human history.',
    longDescription: 'Yuval Noah Harari\'s bestselling book explores the history of our species, from the Stone Age to the Silicon Age. A thought-provoking and enlightening read.',
    price: 22.50,
    images: [],
    category: 'Books',
    stock: 85,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Wooden Building Blocks',
    description: 'Classic toy for creative play.',
    longDescription: 'A set of 100 assorted wooden blocks, perfect for sparking imagination and developing fine motor skills in children.',
    price: 45.99,
    images: [],
    category: 'Toys & Games',
    stock: 30,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Strategy Board Game: Catan',
    description: 'A modern classic board game.',
    longDescription: 'Trade, build, and settle the island of Catan in this addictively fun strategy game. Compete with other players to build the most prosperous colony.',
    price: 49.99,
    images: [],
    category: 'Toys & Games',
    stock: 25,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Hand-Knit Scarf',
    description: 'Cozy and stylish for winter.',
    longDescription: 'Stay warm with this beautifully hand-knit scarf, made from a soft and luxurious merino wool blend.',
    price: 59.99,
    images: [],
    category: 'Handmade',
    stock: 15,
    userId: 'defaultUser',
    reviews: []
  },
  {
    name: 'Handmade Ceramic Mug',
    description: 'Unique and rustic, perfect for coffee or tea.',
    longDescription: 'Each mug is individually thrown on a potter\'s wheel and glazed by hand, making every piece unique. Its comfortable handle and rustic charm make your morning coffee feel special.',
    price: 32.00,
    images: [],
    category: 'Handmade',
    stock: 22,
    userId: 'defaultUser',
    reviews: []
  },
];


const productsCollection = collection(db, 'products');
const ordersCollection = collection(db, 'orders');

// Function to seed initial data
async function seedInitialData() {
    try {
        const snapshot = await getDocs(query(productsCollection));
        if (snapshot.empty) {
            console.log('No products found, seeding initial data...');
            const batch = writeBatch(db);
            initialProducts.forEach(product => {
                const docRef = doc(productsCollection);
                // For demo, assign a placeholder if no image is present
                if (product.images.length === 0) {
                    product.images = [`https://picsum.photos/600/600?random=${Math.random()}`];
                }
                batch.set(docRef, product);
            });
            await batch.commit();
            console.log('Initial data seeded.');
        }
    } catch (error) {
        if (error instanceof Error && /permission-denied/i.test(error.message)) {
            console.warn("Could not seed data due to a permissions issue. Please check your Firestore security rules.");
        } else if (error instanceof Error && /offline/i.test(error.message)) {
             console.warn("Could not seed data, running in offline mode.");
        } else {
             console.error("Error seeding data:", error);
        }
    }
}


export async function getProducts(): Promise<Product[]> {
  try {
    await seedInitialData();
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    if (error instanceof Error && /permission-denied/i.test(error.message)) {
      console.error("Firestore Permission Denied: You don't have access to the 'products' collection. Please check your Firestore security rules in the Firebase console.");
    } else {
      console.error("An unknown error occurred while fetching products:", error);
    }
    // Return an empty array to prevent the app from crashing.
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        }
        return null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function addProduct(productData: Omit<Product, 'id'>) {
    const docRef = await addDoc(productsCollection, productData);
    return { id: docRef.id, ...productData };
}

export async function updateProduct(id:string, productData: Partial<Omit<Product, 'id'>>) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, productData);
    return await getProduct(id);
}

export async function deleteProduct(id: string) {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
    return true;
}

export async function getCategories(): Promise<string[]> {
    try {
        const allProducts = await getProducts();
        if (!allProducts || allProducts.length === 0) return [];
        const categoriesFromProducts = new Set(allProducts.map(p => p.category));
        return [...categoriesFromProducts].sort();
    } catch(error) {
        console.error("Could not get categories, returning empty array.", error);
        return [];
    }
}


export async function createOrder(orderData: Omit<Order, 'id' | 'date'>) {
    const newOrder = {
        ...orderData,
        date: new Date().toISOString(),
    };
    const docRef = await addDoc(ordersCollection, newOrder);
    return { id: docRef.id, ...newOrder };
}

export async function getOrdersForUser(userId: string): Promise<Order[]> {
  try {
    const q = query(ordersCollection, where("userId", "==", userId), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error) {
    console.error("Error fetching orders for user:", error);
    return [];
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(ordersCollection, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error) {
     if (error instanceof Error && /permission-denied/i.test(error.message)) {
      console.error("Firestore Permission Denied: You don't have access to the 'orders' collection. Please check your Firestore security rules.");
    } else {
      console.error("An unknown error occurred while fetching orders:", error);
    }
    return [];
  }
}

    
    

    
