'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css'

import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

// import "bootstrap/dist/css/bootstrap.css";



export default function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  const pathName = usePathname()

  const currentPage = pathName.replace(/^\/+|\/+$/g, '')

  const handleToggleSidebar = () => {
    setIsOpen(prevstate => !prevstate)
  }
  return (
    
          <main className="flex w-full h-screen bg-gray-100">
            <aside className={`flex ${isOpen ? 'w-[320px]' : 'w-0'} h-screen bg-white transition-all duration-300`}>
              <div className="relative">
                {isOpen && <Sidebar />}
                <button
                  className="bg-blue-900 rounded-lg mt-4 p-3 absolute -right-20 top-8"
                  onClick={handleToggleSidebar}
                >
                  <span className="block bg-white h-1 w-6 rounded-sm mb-1"></span>
                  <span className="block bg-white h-1 w-6 rounded-sm mb-1"></span>
                  <span className="block bg-white h-1 w-6 rounded-sm"></span>
                </button>
              </div>
            </aside>
            <article className="w-full flex flex-col min-h-screen  pt-28 ">
              <div className="mt-[1px]">
                <div className="w-full px-8 ">
                  <h2 className="m-0 p-0 capitalize">{pathName === '/' ? 'Dashboard' : currentPage}</h2>
                  <p>
                    Home / <strong>{pathName === '/' ? 'dashboard' : currentPage}</strong>
                  </p>
                </div>
              </div>
              <main className="overflow-y-auto flex-1 p-4 ">{children}</main>
              <Footer />
            </article>
          </main>
        
  )
}
