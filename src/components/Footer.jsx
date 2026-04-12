import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (data) {
        setSettings({
          email: data.email || 'contact@media.sn',
          phone: data.phone || '+221 77 000 00 00',
          address: data.address || ''
        });
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-[#0A1F18] text-white py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-3 flex-shrink-0">
            <Link to="/" className="flex items-center cursor-pointer">
              <span className="text-xl font-bold tracking-tight">Med</span>
              <span className="text-brand-mint text-xl font-bold tracking-tight">IA</span>
              <Activity className="h-5 w-5 text-brand-mint ml-2" />
            </Link>
            <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
              L'Intelligence Artificielle accessible à tous.
            </p>
            <Link to="/admin/login" className="hover:text-brand-mint transition-colors inline-block text-[10px] uppercase font-bold tracking-widest text-[#62C298]/50 mt-2">
              Accès Administration
            </Link>
          </div>

          <div className="flex justify-start md:justify-end">
            <ul className="space-y-3 text-gray-400 text-xs">
              {settings.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-mint flex-shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-mint flex-shrink-0" />
                  <span>{settings.phone}</span>
                </li>
              )}
              {settings.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-mint flex-shrink-0" />
                  <span>{settings.email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-[10px] uppercase tracking-wide">
          &copy; {new Date().getFullYear()} MedIA HealthTech. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
