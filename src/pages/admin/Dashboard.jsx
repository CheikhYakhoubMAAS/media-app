import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Dashboard() {
  const [counts, setCounts] = useState({ services: '--', articles: '--', resources: '--' });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      // Supabase count queries using head: true fetch only the count metadata without row data
      const [servicesRes, articlesRes, resourcesRes] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('resources').select('*', { count: 'exact', head: true })
      ]);

      setCounts({
        services: servicesRes.count ?? 0,
        articles: articlesRes.count ?? 0,
        resources: resourcesRes.count ?? 0
      });
    } catch (error) {
      console.error('Erreur lors du comptage:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans l'interface d'administration MedIA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Services</h3>
          <p className="text-3xl font-bold text-[#0F2C23] mt-2">{counts.services}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Actualités</h3>
          <p className="text-3xl font-bold text-[#0F2C23] mt-2">{counts.articles}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Ressources</h3>
          <p className="text-3xl font-bold text-[#0F2C23] mt-2">{counts.resources}</p>
        </div>
      </div>
    </div>
  );
}
