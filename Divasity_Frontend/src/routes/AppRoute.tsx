import { Routes, Route } from 'react-router-dom';
import { OnboardingWrapper } from '../components/Onboarding/OnboardingWrapper.tsx'; 
import { RootRedirect } from '../components/Auth/RootRedirect.tsx';
import {Category} from '../pages/Client/Category.tsx';
import { CategoryContd } from '../pages/Client/CategoryContd.tsx';
import {Signup} from '../pages/Client/Signup.tsx';
import {Login} from '../pages/Client/Login.tsx';
import { Layout } from '../components/Layout/Layout.tsx';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute.tsx';
import { PrivateRoutes } from './privateRoutes.tsx';
import NewsFeed from '../pages/Client/NewsFeed.tsx';
import NewsDetails from '../pages/Client/NewsDetails.tsx'
import Otp from '../pages/Client/Otp.tsx';
import Profile  from '../pages/Client/Profile.tsx';
import Notifications from '../pages/Client/Notifications.tsx'
export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<RootRedirect/>}/>
        <Route path="/onboarding" element={<OnboardingWrapper/>}/>
        <Route path="/home" element={<RootRedirect/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/register" element={<Signup />} />
        <Route path="/verify/:email" element={<Otp/>}/>
        <Route path="/nextstep" element={<Category />} />
        <Route path="/nextstep/:categoryName" element={<CategoryContd />} />
        <Route path='/updates' element={<NewsFeed/>}/>
        <Route path='/updates/:newsid' element={<NewsDetails/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        {/* Private routes with MainLayout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {PrivateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
    </Routes>
  );
}