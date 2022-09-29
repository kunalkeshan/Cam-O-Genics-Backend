/**
 * Home Page
 */

import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'


const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('keyup', (event) => {
            // . - Period to open up admin app
            if (event.key === '.') {
                navigate('/admin');
            };
            console.log(event)
        });
        return () => window.removeEventListener('keyup', () => null)
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Home