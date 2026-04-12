import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [settings, setSettings] = useState({
    email: 'contact@media.sn',
    phone: '+221 77 000 00 00',
    address: 'Dakar, Sénégal'
  });
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    nom: '',
    message: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (!error && data) {
        setSettings({
          email: data.email || 'contact@media.sn',
          phone: data.phone || '+221 77 000 00 00',
          address: data.address || 'Dakar, Sénégal'
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetEmail = 'contact.media.health@gmail.com';
    const subject = `Nouveau message de ${formData.nom}`;
    const body = formData.message;
    
    // Open mail client
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Clear form gracefully
    setFormData({ nom: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Contactez-nous</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Nous sommes à votre écoute pour accompagner votre transformation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center text-gray-500 text-sm">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0F2C23] mb-4">Nos Coordonnées</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Que ce soit pour une démonstration, une question technique ou une offre de partenariat, MedIA est à votre écoute !
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-[#62C298]/10 p-3 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#62C298]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600 mt-1">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#62C298]/10 p-3 rounded-xl flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#62C298]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-sm text-gray-600 mt-1">{settings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#62C298]/10 p-3 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#62C298]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Adresse</h3>
                    <p className="text-sm text-gray-600 mt-1">{settings.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#0F2C23] mb-6">Envoyez-nous un message</h3>
              
              <div className="mb-6 p-4 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg flex items-start gap-2">
                <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5" /> 
                <span>
                  Ce formulaire ouvrira votre client de messagerie par défaut (Outlook, Gmail...) pour finaliser l'envoi.
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nom complet</label>
                  <input required value={formData.nom} onChange={e=>setFormData({...formData, nom: e.target.value})} type="text" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#62C298] outline-none transition-colors" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea required value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} rows="5" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#62C298] outline-none transition-colors resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0F2C23] text-white py-3 rounded-lg text-sm font-bold hover:bg-[#62C298] transition-colors">
                  <Send className="w-4 h-4" />
                  Ouvrir la messagerie
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
