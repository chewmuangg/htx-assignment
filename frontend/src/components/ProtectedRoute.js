import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" />;
  }
  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;
