import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Edit2, Trash2, X, Check, Eye, EyeOff, Video, UploadCloud } from 'lucide-react';

export default function AdminSolutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    video_url: '',
    is_published: false
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    // Remember: We fetch and write to the `articles` table under the hood!
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error('Error fetching solutions:', error);
    else setSolutions(data || []);
    setLoading(false);
  };

  const handleOpenModal = (solution = null) => {
    if (solution) {
      setFormData({
        title: solution.title || '',
        content: solution.content || '',
        video_url: solution.video_url || '',
        is_published: solution.is_published || false
      });
      setEditingId(solution.id);
    } else {
      setFormData({ title: '', content: '', video_url: '', is_published: true });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', content: '', video_url: '', is_published: false });
    setEditingId(null);
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('med-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('med-media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, video_url: publicUrlData.publicUrl }));
    } catch (error) {
      console.error('Error uploading video:', error.message);
      alert('Échec du téléchargement de la vidéo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase
        .from('articles')
        .update(formData)
        .eq('id', editingId);
      if (error) console.error('Error updating:', error);
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([formData]);
      if (error) console.error('Error inserting:', error);
    }
    handleCloseModal();
    fetchSolutions();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette solution ?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      if (error) console.error('Error deleting:', error);
      else fetchSolutions();
    }
  };

  const togglePublish = async (id, currentStatus) => {
    const { error } = await supabase
      .from('articles')
      .update({ is_published: !currentStatus })
      .eq('id', id);
    if (!error) fetchSolutions();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
          <p className="text-gray-500 mt-1">Gérez vos articles et vidéos de solutions.</p>
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
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Vidéo</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {solutions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      Aucune solution n'a été trouvée.
                    </td>
                  </tr>
                ) : (
                  solutions.map((solution) => (
                    <tr key={solution.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(solution.id, solution.is_published)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            solution.is_published 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {solution.is_published ? (
                            <><Eye className="w-3 h-3" /> Publié</>
                          ) : (
                            <><EyeOff className="w-3 h-3" /> Brouillon</>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{solution.title}</td>
                      <td className="px-6 py-4">
                        {solution.video_url ? (
                          <div className="flex items-center text-[#62C298] text-sm gap-2">
                            <Video className="w-4 h-4" /> Incluse
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(solution)}
                            className="p-2 text-gray-400 hover:text-[#62C298] transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(solution.id)}
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Modifier la solution' : 'Nouvelle solution'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
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

              {/* VIDEO UPLOAD FIELD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vidéo de présentation (optionnel)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#62C298] transition-colors relative">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#0F2C23] hover:text-[#62C298] focus-within:outline-none">
                        <span>{uploading ? 'Téléchargement...' : 'Télécharger une vidéo'}</span>
                        <input id="video-upload" name="video-upload" type="file" accept="video/*" className="sr-only" disabled={uploading} onChange={handleVideoUpload} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">MP4, WebM jusqu'à 1 min</p>
                  </div>
                </div>
                {formData.video_url && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4"/> Vidéo attachée avec succès
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenu / Description</label>
                <textarea
                  required
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#62C298] focus:border-[#62C298] outline-none transition-colors resize-y"
                ></textarea>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-5 h-5 text-[#62C298] focus:ring-[#62C298] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Publier immédiatement
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
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
