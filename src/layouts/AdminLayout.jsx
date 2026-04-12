import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, FileText, DownloadCloud, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Target },
    { name: 'Solutions', path: '/admin/solutions', icon: FileText },
    { name: 'Ressources', path: '/admin/resources', icon: DownloadCloud }, 
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-[#0F2C23] text-white flex flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-[#62C298]">MedIA Admin</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Interface d'Administration
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
