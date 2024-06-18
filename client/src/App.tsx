import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DashboardLayout from './components/layouts/DashboardLayout';
import { AuthProvider } from './hooks/useAuth';
import NotFound from './pages/404';
import Books from './pages/dashboard/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <RecoilRoot>
      <MantineProvider>
        <Notifications />
        <Router>
          <AuthProvider> {/* Authentication provider */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home page */}
              <Route path="/login" element={<Login />} /> {/* Login page */}
              <Route path="/register" element={<Register />} /> {/* Register page */}
              <Route path="/dashboard" element={<DashboardLayout />}> {/* Dashboard layout */}
                <Route path="" element={<Books />} /> {/* Books page within dashboard */}
              </Route>
              <Route path="*" element={<NotFound />} /> {/* 404 page */}
            </Routes>
          </AuthProvider>
        </Router>
      </MantineProvider>
    </RecoilRoot>
  );
}

export default App;
