import express from 'express';
import responseRoutes from './routes/responses.js'; 
import cors from 'cors';    
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use the router
app.use('/', responseRoutes);

// Start the server
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});