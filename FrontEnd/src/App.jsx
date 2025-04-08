import { useState, useEffect } from 'react'
import './App.css'
import CanvaConversation from './components/CanvaConversation'
import ConversationBar from './components/ConversationBar'
import AuthPage from './pages/AuthPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsAuthenticated(true);
        setSelectedConversation("");
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
    setSelectedConversation("");
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      const response = await fetch(`http://localhost:8000/conversation/${conversationId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Si la conversation supprimée était la conversation active
        if (conversationId === selectedConversation) {
          setSelectedConversation("");
        }
        
        // Réinitialiser le composant de conversation
        // Cette approche force un re-rendu des composants qui dépendent de cette valeur
        setRefreshTrigger(prev => prev + 1);
        
        return true;
      } else {
        console.error("Erreur lors de la suppression:", data.message);
        alert("Échec de la suppression de la conversation");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Échec de la suppression de la conversation");
      return false;
    }
  };

  function handleSelectedConversation(conversationId){
    setSelectedConversation(conversationId);
  }

  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className='mainScreen'>
          <ConversationBar 
            userData={userData} 
            onLogout={handleLogout} 
            onsSelectedConversations={handleSelectedConversation}
            activeConversationId={selectedConversation}
            onDeleteConversation={handleDeleteConversation}
            refreshTrigger={refreshTrigger}
          />
          <CanvaConversation id_conversation={selectedConversation}/>
        </div>
      )}
    </>
  );
}

export default App;
