const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const gallery = (url) => [url, url, url];

export const categories = [
  {
    _id: "c1",
    name: "Fruits",
    image: img("photo-1619566636858-adf3ef46400b"),
  },
  {
    _id: "c2",
    name: "Vegetables",
    image: img("photo-1540420773420-3366772f4999"),
  },
  {
    _id: "c3",
    name: "Dairy & Eggs",
    image: img("photo-1550583724-b2692b85b150"),
  },
  {
    _id: "c4",
    name: "Bakery",
    image: img("photo-1509440159596-0249088772ff"),
  },
  {
    _id: "c5",
    name: "Beverages",
    image: img("photo-1600271886742-f049cd451bba"),
  },
  {
    _id: "c6",
    name: "Snacks",
    image: img("photo-1508061253366-f7da158b6d46"),
  },
  {
    _id: "c7",
    name: "Meat & Fish",
    image: img("photo-1544025162-d76694265947"),
  },
];

export const subcategories = [
  { _id: "s1", name: "Fresh Fruits", category: "c1" },
  { _id: "s2", name: "Citrus", category: "c1" },
  { _id: "s3", name: "Leafy Greens", category: "c2" },
  { _id: "s4", name: "Root Vegetables", category: "c2" },
  { _id: "s5", name: "Milk & Cheese", category: "c3" },
  { _id: "s6", name: "Fresh Bread", category: "c4" },
  { _id: "s7", name: "Juices", category: "c5" },
  { _id: "s8", name: "Nuts & Chips", category: "c6" },
];

export const brands = [
  { _id: "b1", name: "FreshCart", image: img("photo-1542838132-92c53300491e") },
  { _id: "b2", name: "GreenFarm", image: img("photo-1540420773420-3366772f4999") },
  { _id: "b3", name: "DailyFresh", image: img("photo-1550583724-b2692b85b150") },
  { _id: "b4", name: "BakeryHouse", image: img("photo-1509440159596-0249088772ff") },
  { _id: "b5", name: "AquaPure", image: img("photo-1600271886742-f049cd451bba") },
  { _id: "b6", name: "SnackLab", image: img("photo-1511381939415-e44015466834") },
];

const categoryById = Object.fromEntries(categories.map((c) => [c._id, c]));
const brandById = Object.fromEntries(brands.map((b) => [b._id, b]));

let counter = 0;
const makeProduct = ({
  title,
  price,
  discount,
  categoryId,
  brandId,
  imageId,
  rating = 4.5,
  reviews = 80,
  stock = 40,
  description,
}) => {
  counter += 1;
  const id = `p${counter}`;
  const url = img(imageId);
  const createdAt = new Date(Date.UTC(2026, 10, 1 + counter)).toISOString();
  return {
    _id: id,
    id,
    title,
    description:
      description ||
      `${title} hand-picked by FreshCart for maximum freshness and flavour. Delivered straight to your door with care.`,
    quantity: stock,
    price,
    priceAfterDiscount: discount || undefined,
    ratingsAverage: rating,
    ratingsQuantity: reviews,
    imageCover: url,
    images: gallery(url),
    category: categoryById[categoryId],
    brand: brandById[brandId],
    createdAt,
  };
};

export const products = [
  // Fruits
  makeProduct({ title: "Fresh Red Apples", price: 45, discount: 36, categoryId: "c1", brandId: "b1", imageId: "photo-1568702846914-96b305d2aaeb", rating: 4.8, reviews: 214, stock: 60, description: "Crisp, juicy red apples sourced from premium orchards. Perfect for snacking, baking or fresh juice." }),
  makeProduct({ title: "Golden Bananas", price: 28, categoryId: "c1", brandId: "b2", imageId: "photo-1571771894821-ce9b6c11b08e", rating: 4.6, reviews: 167, stock: 90 }),
  makeProduct({ title: "Sweet Strawberries", price: 75, discount: 59, categoryId: "c1", brandId: "b1", imageId: "photo-1464965911861-746a04b4bca6", rating: 4.9, reviews: 302, stock: 35, description: "Ripe, fragrant strawberries picked at peak sweetness. Great for desserts and smoothies." }),
  makeProduct({ title: "Juicy Oranges", price: 38, categoryId: "c1", brandId: "b2", imageId: "photo-1547514701-42782101795e", rating: 4.4, reviews: 121, stock: 70 }),

  // Vegetables
  makeProduct({ title: "Farm Tomatoes", price: 24, discount: 19, categoryId: "c2", brandId: "b2", imageId: "photo-1592924357228-91a4daadcfea", rating: 4.7, reviews: 189, stock: 80 }),
  makeProduct({ title: "Organic Carrots", price: 22, categoryId: "c2", brandId: "b2", imageId: "photo-1445282768818-728615cc910a", rating: 4.5, reviews: 96, stock: 65 }),
  makeProduct({ title: "Fresh Broccoli", price: 34, discount: 27, categoryId: "c2", brandId: "b1", imageId: "photo-1459411621453-7b03977f4bfc", rating: 4.6, reviews: 143, stock: 45 }),
  makeProduct({ title: "Crisp Cucumbers", price: 18, categoryId: "c2", brandId: "b2", imageId: "photo-1449300079323-02e209d9d3a6", rating: 4.3, reviews: 88, stock: 75 }),

  // Dairy & Eggs
  makeProduct({ title: "Whole Fresh Milk", price: 32, categoryId: "c3", brandId: "b3", imageId: "photo-1550583724-b2692b85b150", rating: 4.8, reviews: 256, stock: 50, description: "Rich, creamy whole milk from grass-fed cows. Pasteurised and sealed for freshness." }),
  makeProduct({ title: "Free Range Eggs", price: 55, discount: 45, categoryId: "c3", brandId: "b3", imageId: "photo-1506976785307-8732e854ad03", rating: 4.7, reviews: 198, stock: 40 }),
  makeProduct({ title: "Aged Cheddar Cheese", price: 89, categoryId: "c3", brandId: "b3", imageId: "photo-1486297678162-eb2a19b0a32d", rating: 4.6, reviews: 132, stock: 30 }),
  makeProduct({ title: "Creamy Yogurt", price: 42, discount: 34, categoryId: "c3", brandId: "b3", imageId: "photo-1488477181946-6428a0291777", rating: 4.5, reviews: 174, stock: 55 }),

  // Bakery
  makeProduct({ title: "Artisan Sourdough", price: 48, categoryId: "c4", brandId: "b4", imageId: "photo-1509440159596-0249088772ff", rating: 4.9, reviews: 288, stock: 25, description: "Slow-fermented sourdough with a crackling crust and soft, tangy crumb. Baked fresh daily." }),
  makeProduct({ title: "Butter Croissants", price: 36, discount: 29, categoryId: "c4", brandId: "b4", imageId: "photo-1555507036-ab1f4038808a", rating: 4.8, reviews: 221, stock: 30 }),
  makeProduct({ title: "French Baguette", price: 26, categoryId: "c4", brandId: "b4", imageId: "photo-1549931319-a545dcf3bc73", rating: 4.4, reviews: 103, stock: 35 }),
  makeProduct({ title: "Celebration Cake", price: 145, discount: 119, categoryId: "c4", brandId: "b4", imageId: "photo-1578985545062-69928b1d9587", rating: 4.9, reviews: 176, stock: 12 }),

  // Beverages
  makeProduct({ title: "Fresh Orange Juice", price: 39, discount: 31, categoryId: "c5", brandId: "b5", imageId: "photo-1600271886742-f049cd451bba", rating: 4.7, reviews: 205, stock: 60 }),
  makeProduct({ title: "Premium Coffee Beans", price: 120, categoryId: "c5", brandId: "b5", imageId: "photo-1559056199-641a0ac8b55e", rating: 4.8, reviews: 341, stock: 44, description: "Slow-roasted arabica beans with notes of chocolate and caramel. Ground or whole bean." }),
  makeProduct({ title: "Green Tea", price: 58, discount: 46, categoryId: "c5", brandId: "b5", imageId: "photo-1543007630-9710e4a00a20", rating: 4.5, reviews: 118, stock: 70 }),
  makeProduct({ title: "Sparkling Water", price: 21, categoryId: "c5", brandId: "b5", imageId: "photo-1548839140-29a749e1cf4d", rating: 4.2, reviews: 76, stock: 100 }),

  // Snacks
  makeProduct({ title: "Roasted Almonds", price: 95, discount: 79, categoryId: "c6", brandId: "b6", imageId: "photo-1508061253366-f7da158b6d46", rating: 4.8, reviews: 267, stock: 48 }),
  makeProduct({ title: "Sea Salt Potato Chips", price: 29, categoryId: "c6", brandId: "b6", imageId: "photo-1566478989037-eec170784d0b", rating: 4.3, reviews: 154, stock: 85 }),
  makeProduct({ title: "Dark Chocolate Bar", price: 65, discount: 52, categoryId: "c6", brandId: "b6", imageId: "photo-1511381939415-e44015466834", rating: 4.9, reviews: 389, stock: 55 }),
  makeProduct({ title: "Butter Cookies", price: 44, categoryId: "c6", brandId: "b6", imageId: "photo-1499636136210-6f4ee915583e", rating: 4.4, reviews: 112, stock: 62 }),

  // Meat & Fish
  makeProduct({ title: "Fresh Chicken Breast", price: 78, discount: 64, categoryId: "c7", brandId: "b1", imageId: "photo-1587593810167-a84920ea0781", rating: 4.6, reviews: 183, stock: 28 }),
  makeProduct({ title: "Premium Beef Steak", price: 185, categoryId: "c7", brandId: "b1", imageId: "photo-1544025162-d76694265947", rating: 4.9, reviews: 214, stock: 18, description: "Tender, marbled beef steak, aged to perfection. Ideal for grilling or pan-searing." }),
  makeProduct({ title: "Atlantic Salmon", price: 165, discount: 139, categoryId: "c7", brandId: "b1", imageId: "photo-1519708227418-c8fd9a32b7a2", rating: 4.7, reviews: 156, stock: 22 }),
  makeProduct({ title: "King Prawns", price: 195, categoryId: "c7", brandId: "b1", imageId: "photo-1559742811-822873691df8", rating: 4.6, reviews: 98, stock: 16 }),
];

export const demoUser = {
  name: "Demo User",
  email: "demo@freshcart.com",
  password: "Demo@12345",
};
