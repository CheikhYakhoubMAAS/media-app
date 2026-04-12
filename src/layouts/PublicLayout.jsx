import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20"> 
        {/* pt-20 to account for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
