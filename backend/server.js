import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI) //'mongodb://localhost:27017/ecommerce'
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
});

const Product = mongoose.model('Product', productSchema);

//Only for first time

// const seedDB = async () => {
//     try {
//         await Product.deleteMany({});
//         await Product.insertMany([
//             {name: "CYAN T_SHIRT", price: 100, img: "/images/1.webp"},
//             {name: "MAGENTA T_SHIRT", price: 120, img: "/images/2.webp"},
//             {name: "YELLOW T_SHIRT", price: 90, img: "/images/3.webp"},
//             {name: "BLACK T_SHIRT", price: 150, img: "/images/4.webp"},
//             {name: "BLUE T_SHIRT", price: 100, img: "/images/5.webp"},
//             {name: "RED T_SHIRT", price: 110, img: "/images/6.jpg"},
//             {name: "GREEN T_SHIRT", price: 100, img: "/images/7.webp"},
//             {name: "WHITE T_SHIRT", price: 100, img: "/images/8.webp"}
//         ]);
//         console.log("Database Seeded successfully");
//     } catch (err) {
//         console.error("Error seeding database: ", err);
//     }
// };

// seedDB();

app.get('/api/products', async(req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));