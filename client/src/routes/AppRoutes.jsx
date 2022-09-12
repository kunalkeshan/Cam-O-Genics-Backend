/**
 * Application Routes
 */

// Dependencies
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DefaultSkeleton from '../components/reuseable/DefaultSkeleton';

const Landing = lazy(() => import('../pages/Landing'));
const Contact = lazy(() => import('../pages/Contact'));
const OpenSource = lazy(() => import('../pages/OpenSource'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const Events = lazy(() => import('../pages/Events'));
const Page404 = lazy(() => import('../pages/404'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<DefaultSkeleton />}>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/open-source' element={<OpenSource />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-of-conditions' element={<TermsAndConditions />} />
                <Route path='/events' element={<Events />} />
                <Route path='/not-found' element={<Page404 />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes