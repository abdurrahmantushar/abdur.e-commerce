import React from 'react'

import UserMenu from '../components/userMenu'
import { Outlet } from 'react-router-dom'
import UserMenuMobile from '../frontPage/userMenuMobile'

function Dashboard() {
    return (
        <section className='white'>
            <div className="container mx-auto p-3 grid lg:grid-cols-[260px_1fr] gap-5">
                
                <div className="py-4 absulot hidden lg:block  p-4 sticky top-25 h-[calc(100vh-200px)] overflow-y-auto">
                    <UserMenu/>
                </div>
                

                <div className="bg-gray-200/40 font-mono hidden:lg mr-2 shadow-lg">
                    <Outlet/>

                </div>

            </div>
        </section>
    )
}

export default Dashboard
