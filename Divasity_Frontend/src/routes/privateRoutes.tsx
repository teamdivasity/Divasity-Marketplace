import {Dashboard} from '../pages/Customer/Dashboard'
import { Marketplace } from '../pages/Customer/Marketplace'
import { Projects } from '../pages/Customer/Projects'
import { Wallets } from '../pages/Customer/Wallet'
import { Posts } from '../pages/Customer/Posts'

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
        element: <Wallets/>
    },
    {
        path: "/posts",
        element: <Posts/>
    }
]
