import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import {connectDB} from './config/db.js';
import {router as productRoutes} from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  'https://my-shop-client-iag5uln7u-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://my-shop-client-pwiq455la-krishna-gautams-projects-4f6e85c9.vercel.app',
  'https://myshop.vercel.app', 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running`);
});