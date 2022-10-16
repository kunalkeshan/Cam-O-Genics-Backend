/**
 * Home Page
 */

import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts'


const Home = () => {

    useKeyboardShortcuts();

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home