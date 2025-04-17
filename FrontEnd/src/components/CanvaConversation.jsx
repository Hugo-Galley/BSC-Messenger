import { useState, useEffect, useRef } from 'react';
import '../Styles/CanvaConversation.css';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import { GetConversationInfo, GetInternMessageList } from '../scripts/Conversation';
import LongPollingrequest from '../scripts/LongPollingRequest';
import { SpamBilly } from '../scripts/SpamBilly';


export default function CanvaConversation({id_conversation}){
    const [message, setMessage] = useState([]);
    const [convInfo, setConvInfo] = useState();
    const [convName, setConvName] = useState("");
    const [convIcon, setConvIcon] = useState("");
    const bottomConversation = useRef()
    const [refreshTrigger, setRefreshTrigger] = useState(0); 
    const conInfoRef = useRef()

    useEffect(() => {
        conInfoRef.current = convInfo;
    }, [convInfo]);
    
    function EasterEgg(e) {
        if((e.ctrlKey && e.key === "b") || (e.metaKey && e.key === "b")){
            e.preventDefault()
            console.log(conInfoRef.current)
            SpamBilly(conInfoRef.current.id_conversation,conInfoRef.current.herId,setMessage)
            
            
        }
    }

    function handleMessageSent(){
        setRefreshTrigger(prev => prev + 1)
    }

    useEffect(() => {
        if (bottomConversation.current){
            bottomConversation.current.scrollIntoView({ behavior: 'smooth' })
        }
    })


    useEffect(() => {
        let isActive = true
        async function fetchData(){
            try {
                if (id_conversation){
                    const infoConv = await GetConversationInfo(id_conversation)
                    if (infoConv !== false){
                        setConvInfo(infoConv)
                        setConvName(infoConv.name)
                        setConvIcon(infoConv.icon)
                        const messages = await GetInternMessageList(id_conversation)
                        setMessage(messages)
                        const lastDate = messages.length > 0 ? messages[messages.length -1].datetime : new Date().toISOString()
                        await LongPollingrequest(
                            id_conversation,
                            infoConv.myId,
                            lastDate,
                            setMessage,
                            isActive
                        ) 
                            
                }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des messages : ", error)
            }
        }
        fetchData()
        window.addEventListener('keydown',EasterEgg)


        return () => {
            isActive = false
            window.removeEventListener('keydown',EasterEgg)

        }
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
                            <MessageBox key={index} content={messageValue.content} sendAt={messageValue.sendAt} dataType={messageValue.dataType} type={messageValue.type}/>
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