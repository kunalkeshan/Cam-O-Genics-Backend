/**
 * App File
 */

// Dependencies
import React from "react";
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './routes/AppRoutes';
import Backdrop from "./components/reuseable/Backdrop";
import Snackbar from "./components/reuseable/Snackbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Snackbar />
      <Backdrop />
    </div>
  );
}

export default App;
