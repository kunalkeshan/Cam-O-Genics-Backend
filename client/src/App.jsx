/**
 * App File
 */

// Dependencies
import React from "react";
import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
