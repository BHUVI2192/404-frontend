import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store the token and redirect to the dashboard
      localStorage.setItem('token', token);
      toast.success('Successfully logged in with Google!');
      navigate('/dashboard');
    } else {
      // Handle the case where no token is provided
      toast.error('Google authentication failed. Please try again.');
      navigate('/login');
    }
  }, [location, navigate]);

  // Render a simple loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Finalizing your authentication...</p>
    </div>
  );
};

export default GoogleAuthCallback;
