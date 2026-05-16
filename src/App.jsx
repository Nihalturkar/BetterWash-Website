import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import OfferBar from './components/OfferBar/OfferBar'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CategoryDetail from './pages/CategoryDetail/CategoryDetail'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminCategories from './pages/Admin/AdminCategories'
import AdminBlogs from './pages/Admin/AdminBlogs'
import AdminContacts from './pages/Admin/AdminContacts'
import AdminSettings from './pages/Admin/AdminSettings'
import './App.css'

function CustomerLayout() {
  return (
    <>
      <OfferBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <CartProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Customer Routes */}
              <Route path="/*" element={<CustomerLayout />} />
            </Routes>
          </CartProvider>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
