import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Upload from './pages/Upload';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';

function App() {
  
  // Clear token and username on Client Side close
  useEffect( () => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    };
  }, []);

  return (
    <Routes>
      <Route path="/" exact element={ <LandingPage/> } />
      <Route path="/signup" element={ <SignUp/> } />
      <Route path="/home" element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
      <Route path="/settings" element={ <ProtectedRoute><Settings/></ProtectedRoute> } />
      <Route path="/upload" element={ <ProtectedRoute><Upload/></ProtectedRoute> } />
    </Routes>
  );
}

export default App;
