const express = require('express');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', itemRoutes); // Mount item routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
