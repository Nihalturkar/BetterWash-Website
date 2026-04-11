import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CategoryDetail from './pages/CategoryDetail/CategoryDetail'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  )
}

export default App
