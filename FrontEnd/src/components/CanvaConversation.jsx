import { useState, useEffect, useRef } from 'react';
import '../Styles/CanvaConversation.css';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';
import getConversation from '../scripts/GetConversation';

export default function CanvaConversation({id_conversation}){
    const [message, setMessage] = useState([]);
    const [convName, setConvName] = useState("");
    const [convIcon, setConvIcon] = useState("");
    
    const messagesEndRef = useRef(null);

    useEffect(() => {
        async function fetchData(){
            try {
                if (id_conversation){
                    const [msgList, infoConv] = await getConversation("25acdda2-51c3-4977-a97c-955043230ce5")
                    if (infoConv !== false){
                        setMessage(msgList)
                        setConvName(infoConv.name)
                        setConvIcon(infoConv.icon)
                }
                }
            } catch (error) {
                console.error("Erreur lors de la récuoération des messages : ", error)
            }
        }
        fetchData()
    }, [id_conversation])
    
    const handleSendMessage = (messageText) => {
        
        setTimeout(() => {
            const newMessage = {
                content: messageText,
                sendAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: "sent"
            };
            
            setMessage([...message, newMessage]);
        }, 500);
    };
    
    return(
        <div className="main-container-canva">
           <div className="headCanvaConversation">
                <p className="head-icon">{convIcon}</p>
                <p className="head-name">{convName}</p>
           </div>
           
           <div className="messages-container">
                {
                    message.map((messageValue, index) => (
                    <div className="message" key={index}>
                        <div className={`message-container-${messageValue.type}`}>
                            <p className="message-icon">{messageValue.icon}</p>
                            <MessageBox key={index} content={messageValue.content} sendAt={messageValue.sendAt} type={messageValue.type}/>
                        </div>
                    </div>
                    ))
                }
                {}
                <div ref={messagesEndRef} />
           </div>
           
           <MessageInput 
                onSendMessage={handleSendMessage} 
                conversationId={id_conversation}
           />
        </div>
    );
}