import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import { API_URL } from '../../config';

function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchOrders = () => {
    fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchOrders(); }, [token]);

  const updateStatus = async (orderId, status) => {
    await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return;
    await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (selectedOrder?.id === id) setSelectedOrder(null);
    fetchOrders();
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div className="admin-loading">Loading orders...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Orders ({orders.length})</h1>
        <div className="admin-filter-tabs">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button
              key={s}
              className={`admin-filter-tab ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="admin-card"><p className="admin-empty">No orders found</p></div>
      ) : (
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className={selectedOrder?.id === order.id ? 'admin-row-selected' : ''}>
                    <td>{order.id}</td>
                    <td className="admin-td-name">{order.customer.name}</td>
                    <td>{order.customer.phone}</td>
                    <td>{order.items.length} items</td>
                    <td>₹{order.total}</td>
                    <td>
                      <select
                        className={`admin-status-select admin-badge-${order.status}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-btn admin-btn-sm admin-btn-edit" onClick={() => setSelectedOrder(order)}>View</button>
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => deleteOrder(order.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Order #{selectedOrder.id}</h2>
              <button className="admin-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-order-detail-grid">
                <div>
                  <h3>Customer Details</h3>
                  <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                  <p><strong>City:</strong> {selectedOrder.customer.city} - {selectedOrder.customer.pincode}</p>
                </div>
                <div>
                  <h3>Order Info</h3>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
                  <p><strong>Status:</strong> <span className={`admin-badge admin-badge-${selectedOrder.status}`}>{selectedOrder.status}</span></p>
                  <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                </div>
              </div>
              <h3 style={{ marginTop: '1rem' }}>Items</h3>
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.numericPrice}</td>
                      <td>₹{item.numericPrice * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
