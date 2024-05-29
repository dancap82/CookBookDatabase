
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import RecipeDetails from './components/RecipeDetails'; 
import RecipeListItems from './pages/RecipeListItems';
import { useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'


function App() {
  const location =useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
      <Header />
      {isHomePage && <Hero />}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/recipes" element={<RecipeListItems />} /> 
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/about" element={<About />} /> 
      </Routes>
      <Footer />
    </>
     
  );
}

export default App;

