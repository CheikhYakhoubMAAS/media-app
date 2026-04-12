import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Edit2, Trash2, X, Check, FileText, UploadCloud, Download } from 'lucide-react';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    file_url: ''
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error('Error fetching resources:', error);
    else setResources(data || []);
    setLoading(false);
  };

  const handleOpenModal = (res = null) => {
    if (res) {
      setFormData({
        title: res.title || '',
        category: res.category || '',
        file_url: res.file_url || ''
      });
      setEditingId(res.id);
    } else {
      setFormData({ title: '', category: '', file_url: '' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', category: '', file_url: '' });
    setEditingId(null);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('med-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('med-media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, file_url: publicUrlData.publicUrl }));
    } catch (error) {
      console.error('Error uploading file:', error.message);
      alert('Échec du téléchargement du fichier.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase
        .from('resources')
        .update(formData)
        .eq('id', editingId);
      if (error) console.error('Error updating:', error);
    } else {
      const { error } = await supabase
        .from('resources')
        .insert([formData]);
      if (error) console.error('Error inserting:', error);
    }
    handleCloseModal();
    fetchResources();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      if (error) console.error('Error deleting:', error);
      else fetchResources();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ressources</h1>
          <p className="text-gray-500 mt-1">Gérez les documents et fichiers téléchargeables.</p>
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
                  <th className="px-6 py-4 font-medium py-3">Catégorie</th>
                  <th className="px-6 py-4 font-medium py-3">Titre</th>
                  <th className="px-6 py-4 font-medium py-3">Fichier</th>
                  <th className="px-6 py-4 font-medium py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      Aucune ressource n'a été trouvée.
                    </td>
                  </tr>
                ) : (
                  resources.map((res) => (
                    <tr key={res.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {res.category || 'Général'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{res.title}</td>
                      <td className="px-6 py-4">
                        {res.file_url ? (
                          <a href={res.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#62C298] text-sm gap-2 hover:underline">
                            <Download className="w-4 h-4" /> Lien
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(res)}
                            className="p-2 text-gray-400 hover:text-[#62C298] transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(res.id)}
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
                {editingId ? 'Modifier la ressource' : 'Nouvelle ressource'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <input
                  type="text"
                  placeholder="Ex: Factsheet, Présentation..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors"
                />
              </div>

              {/* FILE UPLOAD FIELD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fichier (PDF, DOCX...)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#62C298] transition-colors relative">
                  <div className="space-y-1 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#0F2C23] hover:text-[#62C298] focus-within:outline-none">
                        <span>{uploading ? 'Téléchargement...' : 'Télécharger un fichier'}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" disabled={uploading} onChange={handleFileUpload} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">Jusqu'à 10MB</p>
                  </div>
                </div>
                {formData.file_url && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4"/> Fichier attaché avec succès
                  </p>
                )}
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
                  disabled={uploading}
                  className="flex items-center gap-2 bg-[#0F2C23] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#62C298] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
