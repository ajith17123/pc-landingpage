import './App.css';
import 'lenis/dist/lenis.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Home from './components/Home';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App () {
  // Initialize Lenis smooth scroll coordinated with GSAP
  useSmoothScroll();

  useEffect(()=> {
    AOS.init({
      duration:1200,
      easing: 'ease-in-out',
    })
  }, [] );

  return(
    <HashRouter>
      <Routes>
        <Route path='/' element={< Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App;


