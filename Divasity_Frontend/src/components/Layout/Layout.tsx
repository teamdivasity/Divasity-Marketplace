import {Outlet} from "react-router-dom"
import { TabBar } from "../Header/TabBar"
export function Layout(){
    return (
        <div>
            <main>
                <Outlet/>
            </main>
            <TabBar/>
        </div>
    )
}