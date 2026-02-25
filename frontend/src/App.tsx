import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RoleGuard } from './components/routing/RoleGuard';

// Pages
import { Home } from './pages/Home';
import { Authentication } from './pages/Authentication';
import { FormationDetail } from './pages/FormationDetail';
import { MyApplications } from './pages/MyApplications';
import { Candidates } from './pages/Candidates';
import { CoordinatorDashboard } from './pages/admin/CoordinatorDashboard';
import { AdminFormations } from './pages/admin/AdminFormations';
import { CandidateDetail } from './pages/admin/CandidateDetail';
import { EtablissementDashboard } from './pages/admin/EtablissementDashboard';
import { Error403 } from './pages/Error403';

// Layouts
import { CandidateLayout } from './components/layout/CandidateLayout';
import { CoordinatorLayout } from './components/layout/CoordinatorLayout';
import { EtablissementLayout } from './components/layout/EtablissementLayout';
import { SuperAdminLayout } from './components/layout/SuperAdminLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Authentication />} />
          <Route path="/403" element={<Error403 />} />

          {/* Candidate Routes (Protected) */}
          <Route element={<RoleGuard allowedRoles={['CANDIDATE', 'COORDINATOR', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard" element={<CandidateLayout />}>
              <Route index element={<Home />} />
              <Route path="formations/:id" element={<FormationDetail />} />
              <Route path="mes-candidatures" element={<MyApplications />} />
            </Route>
          </Route>

          {/* Coordinator Routes (Protected) */}
          <Route element={<RoleGuard allowedRoles={['COORDINATOR', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard/admin" element={<CoordinatorLayout />}>
              <Route index element={<CoordinatorDashboard />} />
              <Route path="formations" element={<AdminFormations />} />
              <Route path="candidats" element={<Candidates />} />
              <Route path="candidats/:id" element={<CandidateDetail />} />
            </Route>
          </Route>

          {/* Etablissement Routes (Protected) */}
          <Route element={<RoleGuard allowedRoles={['ETABLISSEMENT_ADMIN', 'SUPER_ADMIN']} />}>
            <Route path="/dashboard/etablissement" element={<EtablissementLayout />}>
              <Route index element={<EtablissementDashboard />} />
              <Route path="formations" element={<AdminFormations />} />
              <Route path="candidats" element={<Candidates />} />
              <Route path="candidats/:id" element={<CandidateDetail />} />
            </Route>
          </Route>

          {/* Super Admin Routes (Protected) */}
          <Route element={<RoleGuard allowedRoles={['SUPER_ADMIN']} />}>
            <Route path="/dashboard/superadmin" element={<SuperAdminLayout />}>
              <Route index element={<div className="p-4">Bienvenue, Super Admin</div>} />
              <Route path="etablissements" element={<div className="p-4">Pages des Établissements (En construction)</div>} />
              <Route path="utilisateurs" element={<div className="p-4">Gestion des Utilisateurs (En construction)</div>} />
              <Route path="statistiques" element={<div className="p-4">Statistiques Globales (En construction)</div>} />
              <Route path="parametres" element={<div className="p-4">Paramètres Système (En construction)</div>} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
