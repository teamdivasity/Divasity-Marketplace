import Dashboard from '../pages/Customer/Dashboard'
import { Marketplace } from '../pages/Customer/Marketplace'
import { Projects } from '../pages/Customer/Projects'
import { Wallet } from '../pages/Customer/Wallet'
import { Posts } from '../pages/Customer/Posts'
import Profile from '../pages/Client/Profile'

export const PrivateRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/marketplace",
        element: <Marketplace/>
    },
    {
        path: "/projects",
        element: <Projects/>
    },
    {
        path: "/wallet",
        element: <Wallet/>
    },
    {
        path: "/posts",
        element: <Posts/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }
]
