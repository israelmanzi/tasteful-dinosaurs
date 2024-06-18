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
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Books />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </MantineProvider>
    </RecoilRoot>
  );
}

export default App;
