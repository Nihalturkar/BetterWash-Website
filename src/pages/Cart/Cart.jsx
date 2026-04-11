import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../pages/ProductDetail/ProductDetail.css'; // For quantity selector styles
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill in all address details before placing the order.");
      return;
    }

    // Format the message
    let message = `*New Order from BetterWash Website*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Order Items:*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.emoji} *${item.name}* (${item.category})\n`;
      message += `   _Details:_ ${item.description}\n`;
      message += `   _Price:_ ${item.quantity} x ₹${item.numericPrice}\n`;
      message += `   _Subtotal:_ ₹${item.quantity * item.numericPrice}\n\n`;
    });
    
    message += `\n*Total Amount: ₹${cartTotal}*\n`;
    message += `\nPlease confirm my order.`;

    // The provided WhatsApp number
    const whatsappNumber = '919584251250';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
    
    // Optionally redirect back to home
    // window.location.href = '/';
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-emoji" style={{ color: item.color }}>
                {item.emoji}
              </div>
              
               <div className="cart-item-details">
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-price">₹{item.numericPrice}</div>
                
                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button 
                      type="button"
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      className="qty-input" 
                      value={item.quantity} 
                      readOnly 
                    />
                    <button 
                      type="button"
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    type="button"
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-total" style={{ fontWeight: '600', fontSize: '1.25rem' }}>
                ₹{item.numericPrice * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-section">
          <h2 className="checkout-title">Order Summary</h2>
          
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleWhatsAppOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                required 
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange}
                required 
                placeholder="+91 9876543210"
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange}
                required 
                placeholder="House No., Building Name, Street Area"
                rows="3"
              ></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange}
                  required 
                  placeholder="Mumbai"
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleInputChange}
                  required 
                  placeholder="400001"
                />
              </div>
            </div>

            <button type="submit" className="whatsapp-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
