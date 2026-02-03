export const products = [
  { id: 1, name: "CYAN T-SHIRT", price: 100, img: "/images/1.webp" },
  { id: 2, name: "MAGENTA T-SHIRT", price: 120, img: "/images/2.webp" },
  { id: 3, name: "YELLOW T-SHIRT", price: 90, img: "/images/3.webp" },
  { id: 4, name: "BLACK HOODIE", price: 150, img: "/images/4.webp" },
  { id: 5, name: "BLUE T-SHIRT", price: 100, img: "/images/5.webp" },
  { id: 6, name: "RED T-SHIRT", price: 110, img: "/images/6.jpg" },
  { id: 7, name: "GREEN T-SHIRT", price: 100, img: "/images/7.webp" },
  { id: 8, name: "WHITE T-SHIRT", price: 100, img: "/images/8.webp" },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500); // Simulate network delay
  });
};