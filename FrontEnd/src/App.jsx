import { useState, useEffect } from 'react'
import './App.css'
import CanvaConversation from './components/CanvaConversation'
import ConversationBar from './components/ConversationBar'
import AuthPage from './pages/AuthPage'
import { DeleteConversation } from './scripts/Conversation'

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
            onDeleteConversation={() => DeleteConversation(selectedConversation,selectedConversation,setSelectedConversation,setRefreshTrigger)}
            refreshTrigger={refreshTrigger}
          />
          <CanvaConversation id_conversation={selectedConversation}/>
        </div>
      )}
    </>
  );
}

export default App;
