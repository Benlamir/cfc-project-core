import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Authentication } from './pages/Authentication';
import { FormationDetail } from './pages/FormationDetail';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />

          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="formations/:id" element={<FormationDetail />} />
            <Route path="formations" element={<div className="p-4">Pages des Formations (En construction)</div>} />
            <Route path="candidats" element={<div className="p-4">Pages des Candidats (En construction)</div>} />
            <Route path="etablissements" element={<div className="p-4">Pages des Établissements (En construction)</div>} />
            <Route path="parametres" element={<div className="p-4">Paramètres (En construction)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
