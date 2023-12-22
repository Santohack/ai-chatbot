import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'
import CustomToastContainer from '@/components/ToastContainer'

const Layout = ({
    children
}:
    { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            <main className='p-4 max-w-7xl mx-auto'>
            <CustomToastContainer />
                {children}
            </main>
        </>
    )
}

export default Layout