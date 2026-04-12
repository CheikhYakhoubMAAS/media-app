import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import * as Icons from 'lucide-react';

const renderIcon = (iconName) => {
  if (!iconName) return <Icons.Circle className="w-8 h-8 text-[#62C298]" />;
  const parts = iconName.trim().split('-');
  const formattedName = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const IconComponent = Icons[formattedName] || Icons.HelpCircle;
  return <IconComponent className="w-8 h-8 text-[#62C298]" />;
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching services:', error);
      else setServices(data || []);
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Nos Services</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Accélérez votre transformation numérique avec nos services d'intégration IA dédiés à la modernisation de vos systèmes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center text-gray-500 text-sm">Chargement...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">Aucun service disponible pour le moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all flex flex-col items-start">
                <div className="bg-[#62C298]/10 p-3 rounded-xl mb-4 shadow-sm">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#0F2C23] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
