import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../Styles/Auth.css';

export default function AuthPage({ onAuthSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleLoginSuccess = (userData) => {
    onAuthSuccess(userData);
  };

  const handleRegisterSuccess = () => {
    setRegistrationSuccess(true);
    setIsLoginView(true); // Basculer vers la connexion après une inscription réussie
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <h1>BSC Messenger</h1>
        <p className="auth-tagline">Messagerie chiffrée de bout en bout</p>
      </div>

      {registrationSuccess && isLoginView && (
        <div className="success-message">
          Inscription réussie ! Vous pouvez maintenant vous connecter.
        </div>
      )}

      {isLoginView ? (
        <LoginForm 
          onSwitchToRegister={() => {
            setIsLoginView(false);
            setRegistrationSuccess(false);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterForm 
          onSwitchToLogin={() => setIsLoginView(true)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  );
}