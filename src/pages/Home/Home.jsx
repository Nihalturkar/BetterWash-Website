import Hero from '../../components/Hero/Hero'
import Products from '../../components/Products/Products'
import Categories from '../../components/Categories/Categories'
import About from '../../components/About/About'
import Reviews from '../../components/Reviews/Reviews'
import Blog from '../../components/Blog/Blog'
import './Home.css'

function Home() {
  return (
    <main className="home-container">
      <Hero />
      <Products />
      <Categories />
      <About />
      <Reviews />
      <Blog />
    </main>
  )
}

export default Home
