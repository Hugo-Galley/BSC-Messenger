import ConversationCard from "./ConversationCard";
import '../Styles/ConversationBar.css'
import { useState, useEffect } from 'react';
import PopUpNewConversation from "./PopUpNewConversation";
import getInformations from "../scripts/GetInformations";

export default function ConversationBar(){
    const [showPopUp, setShowPopUp] = useState(false)
    const [listOfConversation, setListOfConversation] = useState([])
    useEffect(() => {
        async function fetchUsers(){
            try {
                const users = await getInformations("http://localhost:8000/conversation/allOfUser?id_user=01f1b7bd-3283-4961-8364-750646e53cc9")
                setListOfConversation(users)
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error)
            }
        }
        fetchUsers()
    }, [])
   
return(
    <div className="ConversationBar-container">
        <div className="searchbar-head">
            <input 
            placeholder="votre conv"
            style={{width:300, marginRight:10}}
            radius={"md"}
            />
            <button size="35" onClick={() => setShowPopUp(true)} style={{ cursor: 'pointer' , background : 'transparent'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2(" height="25" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>

            </button>
        </div>
        {showPopUp && (
                <div className="overlay">
                    <div className="popup-new-conversation">
                        <PopUpNewConversation onClose={() => setShowPopUp(false)}/>
                    </div>
                </div>
        )}
        
        <div className="conversationBar-body">
        {
            listOfConversation.map((convCard, index) => (
                <a href={`https://galleyhugo.com/${convCard.id_conversation}`}
                 key={index} className="conversation-items"><ConversationCard  key={index}
                                                icon={convCard.icon}
                                                title={convCard.title} 
                                                LastMessagedate={convCard.lastMessageDate} 
                                                body={convCard.body}/></a>
            ))
        }
        </div>
        
    </div>
    
)
}