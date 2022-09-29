/**
 * Application Routes
 */

// Dependencies
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultSkeleton from '../components/reuseable/DefaultSkeleton';

const Home = lazy(() => import('../pages/Home'));
const Landing = lazy(() => import('../pages/Landing'));
const Contact = lazy(() => import('../pages/Contact'));
const OpenSource = lazy(() => import('../pages/OpenSource'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const Events = lazy(() => import('../pages/Events'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Auth = lazy(() => import('../pages/Admin/Auth'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const Main = lazy(() => import('../pages/Admin/Dashboard/Main'));
const Profile = lazy(() => import('../pages/Admin/Dashboard/Profile'));
const Community = lazy(() => import('../pages/Admin/Dashboard/Community'));
const AdminEvents = lazy(() => import('../pages/Admin/Dashboard/Events'));
const Club = lazy(() => import('../pages/Admin/Dashboard/Club'));
const Notifications = lazy(() => import('../pages/Admin/Dashboard/Notifications'));
const Audit = lazy(() => import('../pages/Admin/Dashboard/Audit'));
const Page404 = lazy(() => import('../pages/404'));

const AppRoutes = () => {

    const { user } = useSelector((state) => state.user);
    console.log(user);
    const Protected = ({ children }) => {
        return user ? { children } : <Navigate to='/admin/auth' />;
    }

    return (
        <Suspense fallback={<DefaultSkeleton />}>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route index element={<Landing />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='open-source' element={<OpenSource />} />
                    <Route path='privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='terms-of-conditions' element={<TermsAndConditions />} />
                    <Route path='events' element={<Events />} />
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<Navigate to='/admin/auth' />} />
                    <Route path='auth' element={!user ? <Auth /> : <Navigate to='/admin/dashboard' />} />
                    <Route path='dashboard' element={<Protected><Dashboard /></Protected>}>
                        <Route index element={<Main />} />
                        <Route path='me' element={<Profile />} />
                        <Route path='community' element={<Community />} />
                        <Route path='events' element={<AdminEvents />} />
                        <Route path='club' element={<Club />} />
                        <Route path='audit' element={<Audit />} />
                        <Route path='notifications' element={<Notifications />} />
                    </Route>
                </Route>
                <Route path='/not-found' element={<Page404 />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes