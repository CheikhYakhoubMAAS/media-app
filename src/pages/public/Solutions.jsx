import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
        
      if (error) console.error('Error fetching solutions:', error);
      else setSolutions(data || []);
      setLoading(false);
    };
    
    fetchSolutions();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Nos Solutions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez comment l'IA se met au service du diagnostic médical.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="text-center text-gray-500">Chargement des solutions...</div>
        ) : solutions.length === 0 ? (
          <div className="text-center text-gray-500">Aucune solution publiée actuellement.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <div key={solution.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-all">
                <div className="p-8 flex-grow">
                  <h2 className="text-2xl font-bold text-[#0F2C23] mb-4">{solution.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">{solution.content}</p>
                </div>
                
                {solution.video_url && (
                  <div className="p-8 pt-0 mt-auto">
                    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                      <video 
                        controls 
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-full h-full object-contain" 
                        src={solution.video_url}
                      >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
