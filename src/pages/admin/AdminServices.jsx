import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error('Error fetching services:', error);
    else setServices(data || []);
    setLoading(false);
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon
      });
      setEditingId(service.id);
    } else {
      setFormData({ title: '', description: '', icon: '' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', description: '', icon: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', editingId);
      if (error) console.error('Error updating:', error);
    } else {
      const { error } = await supabase
        .from('services')
        .insert([formData]);
      if (error) console.error('Error inserting:', error);
    }
    handleCloseModal();
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce service ?')) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) console.error('Error deleting:', error);
      else fetchServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">Gérez les services proposés par MedIA.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#62C298] text-[#0F2C23] px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="px-6 py-4 font-medium py-3">Icône</th>
                  <th className="px-6 py-4 font-medium py-3">Titre</th>
                  <th className="px-6 py-4 font-medium py-3">Description</th>
                  <th className="px-6 py-4 font-medium py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      Aucun service n'a été trouvé.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-block p-2 bg-[#62C298]/10 text-[#62C298] rounded-lg">
                          {/* We could render the lucide icon dynamically if icon stores its name */}
                          {service.icon || 'Icon'} 
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                      <td className="px-6 py-4 text-gray-500 line-clamp-2 max-w-md">{service.description}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(service)}
                            className="p-2 text-gray-400 hover:text-[#62C298] transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Modifier le service' : 'Nouveau service'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'icône (ex: Heart)</label>
                <input
                  required
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#0F2C23] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#62C298] transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {editingId ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
