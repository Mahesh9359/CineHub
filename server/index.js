import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running smoothly!',
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
