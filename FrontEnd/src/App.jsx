import './App.css'
import CanvaConversation from './components/CanvaConversation'
import ConversationBar from './components/ConversationBar'

function App() {

  return (
    <div className='mainScreen'>
        <ConversationBar/>
        <CanvaConversation/>
    </div>
  )
}

export default App
