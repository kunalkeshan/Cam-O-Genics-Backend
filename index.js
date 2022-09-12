/* eslint-disable no-console */
/**
 * Cam O Genics Backend Application
 * Initialized On: 25th August 2022
 * Initialized by: Surendar PD <surendarpd007@gmail.com> & Kunal Keshan <kunalkeshan12@gmail.com>
 */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const appRouter = require('./routers');
const { ApiError, initializeApp } = require('./utils/custom');
const errorHandler = require('./middlewares/apiError');
const { PORT, DB_URL } = require('./config');

// Application
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
require('./utils/jobs');

// Use Application Router
app.use(appRouter);

// API Error Handler
app.use('/api', (req, res, next) => {
    const notFoundError = new ApiError({ message: 'app/route-not-found', statusCode: 404, data: { method: req.method } });
    next(notFoundError);
});

app.use(express.static(path.resolve(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.use(errorHandler);

// Connect DB and Start server
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('\n\n🗃️  Connected to MongoDB.');
        app.listen(PORT, () => console.log(`🚀 Server running at PORT: ${PORT}`));
        initializeApp();
    })
    .catch((err) => {
        console.log(`Unable to connect to DB and start server: ${err}`);
        process.exit(1);
    });
// test
