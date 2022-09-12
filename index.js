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
app.use(express.static(path.join(__dirname, 'public')));
require('./utils/jobs');

app.get('/', (req, res) => {
    res.json({ message: 'Hello there!' });
});

// Use Application Router
app.use(appRouter);

// Error Handlers
app.use((req, res, next) => {
    const notFoundError = new ApiError({ message: 'app/route-not-found', statusCode: 404 });
    next(notFoundError);
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
