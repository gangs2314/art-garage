import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Upload, Plus, X } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formOpen, setFormOpen] = useState(null); // 'photo', 'video', or null
  const [formData, setFormData] = useState({
    file: null,
    fileName: '',
    title: '',
    bio: '',
    artist: 'sude',
  });
  const [uploading, setUploading] = useState(false);

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/items', {
        credentials: 'include',
      });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          file: event.target.result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file || !formData.title) {
      setError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: formData.file.split(',')[1], // base64 only
          title: formData.title,
          bio: formData.bio,
          artist: formData.artist,
          type: formOpen,
        }),
        credentials: 'include',
      });

      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (res.ok) {
        await fetchItems();
        setFormOpen(null);
        setFormData({
          file: null,
          fileName: '',
          title: '',
          bio: '',
          artist: 'sude',
        });
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;

    try {
      const res = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        credentials: 'include',
      });

      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (res.ok) {
        await fetchItems();
      } else {
        setError('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Delete error');
    }
  };

  const handleLogout = async () => {
    // Clear session by calling logout endpoint (if you create one)
    // For now, just navigate to login
    document.cookie = 'session=; Path=/; Max-Age=0';
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bone text-ink flex items-center justify-center">
        <p className="text-warmGray">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone text-ink">
      {/* Header */}
      <div className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
            <p className="text-warmGray text-sm mt-1">Manage portfolio items</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-bloodRed hover:bg-bloodRed/5 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 bg-bloodRed/10 border border-bloodRed text-bloodRed px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button
            onClick={() => setFormOpen('photo')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-ink text-bone rounded font-semibold uppercase tracking-wider text-sm hover:bg-bloodRed transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Photo
          </button>
          <button
            onClick={() => setFormOpen('video')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-ink text-bone rounded font-semibold uppercase tracking-wider text-sm hover:bg-bloodRed transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Video
          </button>
        </div>

        {/* Upload Form */}
        {formOpen && (
          <div className="mb-12 bg-white border border-ink/10 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold">
                Add {formOpen === 'photo' ? 'Photo' : 'Video'}
              </h2>
              <button
                onClick={() => setFormOpen(null)}
                className="text-warmGray hover:text-ink transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
                  {formOpen === 'photo' ? 'Photo' : 'Video'} File *
                </label>
                <div className="border-2 border-dashed border-ink/20 rounded-lg p-8 text-center cursor-pointer hover:border-bloodRed transition-colors">
                  <input
                    type="file"
                    accept={formOpen === 'photo' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <Upload className="w-8 h-8 mx-auto text-warmGray mb-2" />
                    <p className="text-sm font-semibold">{formData.fileName || 'Click to upload'}</p>
                    <p className="text-xs text-warmGray mt-1">
                      {formOpen === 'photo' ? 'JPG, PNG' : 'MP4, WebM'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-ink/20 rounded text-sm focus:outline-none focus:border-bloodRed transition-colors"
                  placeholder="e.g., Black & Gray Portrait"
                />
              </div>

              {/* Bio/Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
                  Description
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-ink/20 rounded text-sm focus:outline-none focus:border-bloodRed transition-colors"
                  placeholder="Add details about this work..."
                  rows="3"
                />
              </div>

              {/* Artist Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
                  Artist *
                </label>
                <div className="flex gap-4">
                  {['sude', 'sagar'].map((artist) => (
                    <label
                      key={artist}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="artist"
                        value={artist}
                        checked={formData.artist === artist}
                        onChange={(e) =>
                          setFormData({ ...formData, artist: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold capitalize">{artist}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-ink text-bone py-3 rounded font-semibold uppercase tracking-wider text-sm hover:bg-bloodRed transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>
        )}

        {/* Items List */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-6">Portfolio Items</h2>
          {items.length === 0 ? (
            <p className="text-warmGray text-center py-12">No items yet. Add one to get started.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-ink/10 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-square bg-ink/5 overflow-hidden">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-ink mb-1">{item.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-bloodRed font-semibold mb-2">
                      {item.artist} • {item.type}
                    </p>
                    {item.bio && (
                      <p className="text-xs text-warmGray mb-4 line-clamp-2">{item.bio}</p>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-bloodRed/10 text-bloodRed rounded hover:bg-bloodRed/20 transition-colors text-xs font-semibold uppercase tracking-wider"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
