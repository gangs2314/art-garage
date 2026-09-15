import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone text-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-center mb-2">
            Art Garage
          </h1>
          <p className="text-center text-warmGray text-sm uppercase tracking-widest font-semibold">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-ink/10 rounded-lg p-8 shadow-sm space-y-6"
        >
          {error && (
            <div className="bg-bloodRed/10 border border-bloodRed text-bloodRed px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-ink/20 rounded text-sm focus:outline-none focus:border-bloodRed transition-colors"
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-ink mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-ink/20 rounded text-sm focus:outline-none focus:border-bloodRed transition-colors"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-bone py-3 rounded font-semibold uppercase tracking-wider text-sm hover:bg-bloodRed transition-colors disabled:opacity-50 cursor-disabled"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-warmGray text-xs mt-8 leading-relaxed">
          Contact studio management for credentials
        </p>
      </div>
    </div>
  );
}
