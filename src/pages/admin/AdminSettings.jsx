import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Check } from 'lucide-react';

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // Ignore no rows returned to just allow creating a new empty row
        console.error('Error fetching settings:', error);
      }
    } else if (data) {
      setFormData({
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...formData });

    if (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde.' });
    } else {
      setMessage({ type: 'success', text: 'Paramètres mis à jour avec succès.' });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres Généraux</h1>
        <p className="text-gray-500 mt-1">Gérez les informations de contact publiques du site.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {message && (
              <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contact</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors"
                placeholder="contact@media.sn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone Principal</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors"
                placeholder="+221 77 123 45 67"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Physique</label>
              <textarea
                rows="3"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors resize-y"
                placeholder="Dakar, Sénégal..."
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#0F2C23] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#62C298] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
