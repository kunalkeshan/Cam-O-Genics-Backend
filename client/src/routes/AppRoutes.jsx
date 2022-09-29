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
const ForgotPassword = lazy(() => import('../pages/Admin/ForgotPassword'));
const VerifyOtp = lazy(() => import('../pages/Admin/VerifyOtp'));
const ResetPassword = lazy(() => import('../pages/Admin/ResetPassword'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const Main = lazy(() => import('../pages/Admin/Dashboard/Main'));
const Profile = lazy(() => import('../pages/Admin/Dashboard/Profile'));
const Community = lazy(() => import('../pages/Admin/Dashboard/Community'));
const AdminEvents = lazy(() => import('../pages/Admin/Dashboard/Events'));
const Club = lazy(() => import('../pages/Admin/Dashboard/Club'));
const Notifications = lazy(() => import('../pages/Admin/Dashboard/Notifications'));
const Audit = lazy(() => import('../pages/Admin/Dashboard/Audit'));
const Settings = lazy(() => import('../pages/Admin/Dashboard/Settings'));
const Page404 = lazy(() => import('../pages/404'));

const AppRoutes = () => {

    const { user } = useSelector((state) => state.user);

    const Protected = ({ Page }) => {
        return (user && user?.authRole === 'ADMIN') ? <Page /> : <Navigate to='/admin/auth' />;
    };

    const Authenticated = ({ Page }) => {
        return (user && user?.authRole === 'ADMIN') ? <Navigate to='/admin/dashboard' /> : <Page />
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
                    <Route path='auth' element={<Authenticated Page={Auth} />} />
                    <Route path='forgot-password' element={<Authenticated Page={ForgotPassword} />} />
                    <Route path='verify-otp' element={<Authenticated Page={VerifyOtp} />} />
                    <Route path='reset-password' element={<Authenticated Page={ResetPassword} />} />
                    <Route path='dashboard' element={<Protected Page={Dashboard} />}>
                        <Route index element={<Main />} />
                        <Route path='me' element={<Profile />} />
                        <Route path='community' element={<Community />} />
                        <Route path='events' element={<AdminEvents />} />
                        <Route path='club' element={<Club />} />
                        <Route path='audits' element={<Audit />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='settings' element={<Settings />} />
                        <Route path='*' element={<Navigate to='/not-found' />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/not-found' />} />
                </Route>
                <Route path='/not-found' element={<Page404 />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes