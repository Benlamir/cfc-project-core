import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Ajout des autres routes plus tard : /login, /courses/:id */}
      </Routes>
    </Router>
  );
}

export default App;
