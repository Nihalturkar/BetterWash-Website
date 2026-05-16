import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import { API_URL } from '../../config';

function AdminContacts() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchContacts = () => {
    fetch(`${API_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchContacts(); }, [token]);

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/contacts/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact message?')) return;
    await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (selectedContact?.id === id) setSelectedContact(null);
    fetchContacts();
  };

  const openContact = (contact) => {
    setSelectedContact(contact);
    if (contact.status === 'unread') {
      updateStatus(contact.id, 'read');
    }
  };

  const filteredContacts = filter === 'all' ? contacts : contacts.filter(c => c.status === filter);
  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  if (loading) return <div className="admin-loading">Loading contacts...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          Contact Messages ({contacts.length})
          {unreadCount > 0 && <span className="admin-badge admin-badge-pending" style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>{unreadCount} new</span>}
        </h1>
        <div className="admin-filter-tabs">
          {['all', 'unread', 'read', 'replied'].map(s => (
            <button
              key={s}
              className={`admin-filter-tab ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              {s === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="admin-card"><p className="admin-empty">No contact messages found</p></div>
      ) : (
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(contact => (
                  <tr key={contact.id}
                    style={{ fontWeight: contact.status === 'unread' ? '600' : '400', cursor: 'pointer' }}
                    onClick={() => openContact(contact)}
                  >
                    <td style={{ fontSize: '0.8rem' }}>
                      {contact.status === 'unread' ? '🔵' : contact.status === 'replied' ? '✅' : '📩'}
                    </td>
                    <td className="admin-td-name">{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || '-'}</td>
                    <td>{contact.subject}</td>
                    <td>
                      <span className={`admin-badge ${contact.status === 'unread' ? 'admin-badge-pending' : contact.status === 'replied' ? 'admin-badge-delivered' : 'admin-badge-info'}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td>{new Date(contact.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <div className="admin-actions" onClick={e => e.stopPropagation()}>
                        {contact.status !== 'replied' && (
                          <button className="admin-btn admin-btn-sm admin-btn-edit" onClick={() => updateStatus(contact.id, 'replied')}>
                            Mark Replied
                          </button>
                        )}
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedContact && (
        <div className="admin-modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Message from {selectedContact.name}</h2>
              <button className="admin-modal-close" onClick={() => setSelectedContact(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-order-detail-grid">
                <div>
                  <p><strong>Name:</strong> {selectedContact.name}</p>
                  <p><strong>Email:</strong> {selectedContact.email}</p>
                  <p><strong>Phone:</strong> {selectedContact.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p><strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString('en-IN')}</p>
                  <p><strong>Status:</strong> <span className={`admin-badge ${selectedContact.status === 'unread' ? 'admin-badge-pending' : selectedContact.status === 'replied' ? 'admin-badge-delivered' : 'admin-badge-info'}`}>{selectedContact.status}</span></p>
                </div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <p><strong>Subject:</strong> {selectedContact.subject}</p>
                <div style={{ marginTop: '0.75rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px', lineHeight: '1.7', color: '#374151' }}>
                  {selectedContact.message}
                </div>
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="admin-btn admin-btn-primary"
                  onClick={() => updateStatus(selectedContact.id, 'replied')}>
                  Reply via Email
                </a>
                {selectedContact.phone && (
                  <a href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="admin-btn admin-btn-secondary">
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
