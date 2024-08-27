const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

require('dotenv').config()

const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
// Use morgan with the 'tiny' format
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles', authMiddleware, articleRoutes);
app.use('/api/categories', authMiddleware, categoryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("NODE ENV is set to ", process.env.NODE_ENV)
    console.log(`Server is running on port ${PORT}`);
});