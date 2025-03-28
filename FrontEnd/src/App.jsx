import { useState, useEffect } from 'react'
import './App.css'
import CanvaConversation from './components/CanvaConversation'
import ConversationBar from './components/ConversationBar'
import AuthPage from './pages/AuthPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUserData(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserData(null);
  };

  function handleSelectedConversation(conversationId){
    setSelectedConversation(conversationId)
  }
  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className='mainScreen'>
          <ConversationBar userData={userData} onLogout={handleLogout} onsSelectedConversations={handleSelectedConversation} />
          <CanvaConversation id_conversation={selectedConversation}/>
        </div>
      )}
    </>
  )
}

export default App
