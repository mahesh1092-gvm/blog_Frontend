import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/authStore';
import {
  pageBackground,
  pageWrapper,
  section,
  cardClass,
  headingClass,
  subHeadingClass,
  bodyText,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleMeta,
  articleExcerpt,
  timestampClass,
  articleStatusActive,
  articleStatusDeleted,
  emptyStateClass,
  submitBtn,
  formGroup,
  labelClass,
  inputClass,
  errorClass,
  successClass,
} from '../styles/common.js';

const API_BASE = 'https://blog-backend-rqmb.onrender.com';

function AdminProfil() {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); 
  const visibleUsers = users.filter((user) => user.role !== 'ADMIN');
  const [articles, setArticles] = useState([]); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const loadAdminData = async () => {
      // Don't fetch if auth is still loading or user is not ready
      if (loading || !currentUser) return;
      if (currentUser?.role !== 'ADMIN') {
        setError('You do not have admin access');
        return;
      }

      setDataLoading(true);
      setError('');

      try {
        const [usersRes, articlesRes] = await Promise.all([
          axios.get(`${API_BASE}/admin-api/users`, { withCredentials: true }),
          axios.get(`${API_BASE}/admin-api/articles`, { withCredentials: true }),
        ]);

        setUsers(usersRes.data.users || []);
        setArticles(articlesRes.data.articles || []);
      } catch (err) {
        console.error('Failed to load admin data:', err);
        const message = err.response?.data?.message || err.message || 'Could not load admin data';
        setError(message);
      } finally {
        setDataLoading(false);
      }
    };

    loadAdminData();
  }, [currentUser, loading])

  const handleBlockArticle = async (articleId) => {
    try {
      const response = await axios.patch(
        `${API_BASE}/admin-api/articles/${articleId}/block`,
        {},
        { withCredentials: true },
      );
      const updatedArticle = response.data;
      setArticles(articles.map(article => 
        article._id === articleId 
          ? updatedArticle.article
          : article
      ));
      setMessage('Article blocked successfully');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not block article';
      setError(message);
    }
  };

  const handleActivateArticle = async (articleId) => {
    try {
      const response = await axios.patch(
        `${API_BASE}/admin-api/articles/${articleId}/activate`,
        {},
        { withCredentials: true },
      );
      const updatedArticle = response.data;
      setArticles(articles.map(article => 
        article._id === articleId 
          ? updatedArticle.article
          : article
      ));
      setMessage('Article activated successfully');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not activate article';
      setError(message);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      const response = await axios.patch(
        `${API_BASE}/admin-api/users/${userId}/block`,
        {},
        { withCredentials: true },
      );
      const updatedUser = response.data.user;
      setUsers(users.map(user =>
        user._id === userId ? updatedUser : user
      ));
      setMessage('User blocked successfully');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not block user';
      setError(message);
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      const response = await axios.patch(
        `${API_BASE}/admin-api/users/${userId}/activate`,
        {},
        { withCredentials: true },
      );
      const updatedUser = response.data.user;
      setUsers(users.map(user =>
        user._id === userId ? updatedUser : user
      ));
      setMessage('User activated successfully');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not activate user';
      setError(message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.put(
        `${API_BASE}/admin-api/password`,
        { currentPassword, newPassword },
        { withCredentials: true },
      );

      setMessage(response.data.message || 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Could not update password';
      setError(message);
    }
  };

  return (
    <div className={`${pageBackground} py-10`}>
      <div className={pageWrapper}>
        <div className={`mb-8 ${cardClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={subHeadingClass}>Admin Dashboard</p>
              <h1 className={headingClass}>Welcome back, {currentUser?.firstName || 'Admin'}</h1>
            </div>
            <div className="text-right">
              <p className={bodyText}>Role: {currentUser?.role || 'ADMIN'}</p>
              <p className={bodyText}>{currentUser?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className={`${cardClass} ${section}`}>
            <h2 className={headingClass}>Admin Controls</h2>
            <p className={bodyText}>Update your password.</p>

            <div className="mt-6 space-y-4">
              {message && <p className={successClass}>{message}</p>}
              {error && <p className={errorClass}>{error}</p>}

              <button
                type="button"
                onClick={() => setShowPasswordForm((prev) => !prev)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                {showPasswordForm ? 'Hide Change Password' : 'Change Password'}
              </button>

              {showPasswordForm && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className={formGroup}>
                    <label className={labelClass} htmlFor="currentPassword">Current Password</label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className={formGroup}>
                    <label className={labelClass} htmlFor="newPassword">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className={submitBtn}>
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          <section className={`${cardClass} ${section}`}>
            <h2 className={headingClass}>Summary</h2>
            <div className="mt-6 grid gap-4">
              <div className={`${cardClass} bg-[#f4f7fb]`}> 
                <p className={subHeadingClass}>Total Users</p>
                <p className={headingClass}>{visibleUsers.length}</p>
              </div>
              <div className={`${cardClass} bg-[#f4f7fb]`}> 
                <p className={subHeadingClass}>Total Articles</p>
                <p className={headingClass}>{articles.length}</p>
              </div>
            </div>
          </section>
        </div>

        <section className={`${cardClass} ${section} mt-8`}>
          <h2 className={headingClass}>All Users</h2>
          {dataLoading ? (
            <p className={bodyText}>Loading users...</p>
          ) : visibleUsers.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleUsers.map((user) => (
                <div key={user._id} className={cardClass}>
                  <h4 className={articleTitle}>
                    {user.firstName} {user.lastName || ''}
                  </h4>
                  <p className={articleMeta}>{user.email}</p>
                  <p className={bodyText}>
                    Role: <strong>{user.role}</strong>
                  </p>
                  <p className={bodyText}>
                    Status: <span className={user.isUserActive ? articleStatusActive : articleStatusDeleted}>
                      {user.isUserActive ? 'Active' : 'Blocked'}
                    </span>
                  </p>
                  <p className={timestampClass}>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {user.isUserActive ? (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="bg-red-500 text-white text-sm px-3 py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Block User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateUser(user._id)}
                        className="bg-green-500 text-white text-sm px-3 py-2 rounded-full hover:bg-green-600 transition"
                      >
                        Activate User
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyStateClass}>No users found.</p>
          )}
        </section>

        <section className={`${cardClass} ${section} mt-8`}>
          <h2 className={headingClass}>All Articles</h2>
          {dataLoading ? (
            <p className={bodyText}>Loading articles...</p>
          ) : articles.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div key={article._id} className={articleCardClass}>
                  <h4 className={articleTitle}>{article.title}</h4>
                  <p className={articleMeta}>
                    Author: {article.author ? `${article.author.firstName} ${article.author.lastName || ''}`.trim() : 'Unknown'}
                  </p>
                  <p className={articleMeta}>Category: {article.category}</p>
                  <p className={bodyText}>
                    Status: <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
                      {article.isArticleActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <p className={timestampClass}>
                    Created: {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className={articleExcerpt}>{article.content?.slice(0, 100)}...</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {article.isArticleActive ? (
                      <button
                        onClick={() => handleBlockArticle(article._id)}
                        className="bg-red-500 text-white text-sm px-3 py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Block Article
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateArticle(article._id)}
                        className="bg-green-500 text-white text-sm px-3 py-2 rounded-full hover:bg-green-600 transition"
                      >
                        Activate Article
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyStateClass}>No articles found.</p>
          )}
        </section>
      </div>
    </div>
  );
}
export default AdminProfil;