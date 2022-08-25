/**
 * Cam O Genics Backend Application
 * Initialized On: 25th August 2022
 * Initialized by: Surendar PD <surendarpd007@gmail.com> & Kunal Keshan <kunalkeshan12@gmail.com>
 */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const appRouter = require('./routers');
const { PORT, DB_URL } = require('./config');

// Application
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use Application Router
app.use(appRouter);

// Error Handlers

// Connect DB and Start server
mongoose.connect(DB_URL)
    .then((_) => {
        console.log(`Connected to MongoDB.`);
        app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
    })
    .catch((err) => {
        console.log(`Unable to connect to DB and start server: ${err}`);
        process.exit(1);
    });