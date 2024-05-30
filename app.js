const express = require('express');
const cors = require('cors');
const app = express();
const artistsRouter = require('./api/routes/artists');

app.use(cors());

// Handling preflight requests
app.options('*', cors());

// Parse JSON bodies for POST requests
app.use(express.json());

// Routes
app.use('/artists', artistsRouter);

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
