import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import { API_URL } from '../../config';

function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
  if (!stats) return <div className="admin-loading">Failed to load dashboard</div>;

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#e0f7fa' }}>📦</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">{stats.totalProducts}</span>
            <span className="admin-stat-label">Products</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fff3e0' }}>🛒</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">{stats.totalOrders}</span>
            <span className="admin-stat-label">Total Orders</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#e8f5e9' }}>💰</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">₹{stats.totalRevenue.toLocaleString()}</span>
            <span className="admin-stat-label">Revenue</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fce4ec' }}>⏳</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">{stats.pendingOrders}</span>
            <span className="admin-stat-label">Pending Orders</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#f3e8ff' }}>📝</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">{stats.totalBlogs}</span>
            <span className="admin-stat-label">Blog Posts</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fef9c3' }}>📬</div>
          <div className="admin-stat-info">
            <span className="admin-stat-number">{stats.unreadContacts}</span>
            <span className="admin-stat-label">New Messages</span>
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h2 className="admin-card-title">Recent Orders</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="admin-empty">No orders yet</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer.name}</td>
                      <td>₹{order.total}</td>
                      <td>
                        <span className={`admin-badge admin-badge-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Low Stock Alert</h2>
          {stats.lowStockProducts.length === 0 ? (
            <p className="admin-empty">All products well stocked!</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.lowStockProducts.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td><span className="admin-badge admin-badge-pending">{p.stock}</span></td>
                      <td>{p.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Recent Contact Messages</h2>
        {(!stats.recentContacts || stats.recentContacts.length === 0) ? (
          <p className="admin-empty">No contact messages yet</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentContacts.map(c => (
                  <tr key={c.id} style={{ fontWeight: c.status === 'unread' ? '600' : '400' }}>
                    <td>{c.status === 'unread' ? '🔵' : '📩'}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td>
                      <span className={`admin-badge ${c.status === 'unread' ? 'admin-badge-pending' : 'admin-badge-info'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
