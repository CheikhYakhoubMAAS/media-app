import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FileText, Eye } from 'lucide-react';

export default function Ressources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) console.error('Error fetching resources:', error);
      else setResources(data || []);
      setLoading(false);
    };
    
    fetchResources();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ressources</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Documentation, guides et outils en libre accès pour enrichir votre expertise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center text-gray-500">Chargement des ressources...</div>
        ) : resources.length === 0 ? (
          <div className="text-center text-gray-500">Aucune ressource disponible actuellement.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const viewUrl = resource.file_url ? `${resource.file_url}#toolbar=0` : '';

              return (
                <div key={resource.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4 w-full">
                    <div className="bg-[#62C298]/10 p-3 rounded-lg flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#62C298]" />
                    </div>
                    <div className="flex-grow">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[10px] uppercase font-bold rounded mb-1">
                        {resource.category || 'Général'}
                      </span>
                      <h3 className="font-bold text-[#0F2C23] line-clamp-2">{resource.title}</h3>
                    </div>
                  </div>
                  
                  <div className="w-full mt-auto pt-4 border-t border-gray-50">
                    {resource.file_url ? (
                      <a 
                        href={viewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#0F2C23] text-white py-2.5 rounded-lg font-medium hover:bg-[#62C298] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Voir
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-500 py-2.5 rounded-lg font-medium cursor-not-allowed">
                        Lien indisponible
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
