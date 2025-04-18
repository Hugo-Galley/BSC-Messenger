import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../Styles/Auth.css';
import logo from "../assets/logo.png"

export default function AuthPage({ onAuthSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleLoginSuccess = (userData) => {
    onAuthSuccess(userData);
  };

  const handleRegisterSuccess = () => {
    setRegistrationSuccess(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <img src={logo} alt="" className="logoShadow"/>
        <h1>Phantom</h1>
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
          loginSucces={handleLoginSuccess}
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