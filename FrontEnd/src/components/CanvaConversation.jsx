import { useState, useEffect, useRef } from 'react';
import '../Styles/CanvaConversation.css';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import getConversation from '../scripts/Conversation';

export default function CanvaConversation({id_conversation}){
    const [message, setMessage] = useState([]);
    const [convInfo, setConvInfo] = useState();
    const [convName, setConvName] = useState("");
    const [convIcon, setConvIcon] = useState("");
    const bottomConversation = useRef()
    const [refreshTrigger, setRefreshTrigger] = useState(0); 
    
        
    function handleMessageSent(){
        setRefreshTrigger(prev => prev + 1)
    }

    useEffect(() => {
        if (bottomConversation.current){
            bottomConversation.current.scrollIntoView({ behavior: 'smooth' })
        }
    })

    useEffect(() => {
        async function fetchData(){
            try {
                if (id_conversation){
                    console.log(id_conversation)
                    const [msgList, infoConv] = await getConversation(id_conversation)
                    if (infoConv !== false){
                        setMessage(msgList)
                        setConvInfo(infoConv)
                        setConvName(infoConv.name)
                        setConvIcon(infoConv.icon)
                }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des messages : ", error)
            }
        }
        fetchData()
    }, [id_conversation, refreshTrigger])

    
    return(
        <div className="main-container-canva">
            { id_conversation !== "" ? (
                <>
                <div className="headCanvaConversation">
                <p className="head-icon">{convIcon}</p>
                <p className="head-name">{convName}</p>
           </div>
           
           <div className="messages-container">
                {
                    message.length > 0 ?(  
                    message.map((messageValue, index) => (
                    <div className="message" key={index}>
                        <div className={`message-container-${messageValue.type}`}>
                            <p className="message-icon">{messageValue.icon}</p>
                            <MessageBox key={index} content={messageValue.content} sendAt={messageValue.sendAt} type={messageValue.type}/>
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="empty-conversation">
                    <p>Cette conversation ne contient aucun message.</p>
                    <p className="empty-hint">Envoyez le premier message pour démarrer la conversation !</p>
                </div>
                )
                }
                <span ref={bottomConversation}></span>
           </div>
           
           <MessageInput 
                conversationId={id_conversation}
                conversationInfo={convInfo}
                onMessagesent={handleMessageSent}
           />
           </>
           ): (
            <div className="empty-conversation">
                <p>Aucune conversation ouverte</p>
                <p className="empty-hint">Ouvrer une conversation via la sideBar ou crée en grace au bouton</p>
            </div>
           )
            }
           
        </div>
    );
}