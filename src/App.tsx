import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {


  return (
    <Router>
      <main className='w-full h-screen flex flex-col bg-slate-50'>
      <Header/>
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
      </main>
    </Router>
  )
}

export default App
