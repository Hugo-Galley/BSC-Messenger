import { useState, useEffect, useRef } from 'react';
import '../Styles/CanvaConversation.css';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';

export default function CanvaConversation({id_conversation}){
    const [message, setMessage] = useState([
        {
            "content" : "Salut ça va",
            "sendAt" : "13:30",
            "type": "received"
        },
        {
            "content" : "Oui ça va super et toi",
            "sendAt" : "13:35",
            "type": "sent"
        },
        {
            "content" : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquam magnam distinctio, similique explicabo illum ipsum alias unde eaque laudantium amet, debitis maiores autem necessitatibus exercitationem. Molestias quae nobis et!",
            "sendAt" : "13:39",
            "type": "received"
        },
        {
            "content" : "Ok génial ça ",
            "sendAt" : "13:40",
            "type": "sent"
        },
    ]);
    
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);
    
    const handleSendMessage = (messageText) => {
        setIsLoading(true);
        
        setTimeout(() => {
            const newMessage = {
                content: messageText,
                sendAt: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: "sent"
            };
            
            setMessage([...message, newMessage]);
            setIsLoading(false);
        }, 500);
    };
    
    return(
        <div className="main-container-canva">
           <div className="headCanvaConversation">
                <p className="head-icon">HG</p>
                <p className="head-name">Galley Hugo et Flahaut Axel</p>
           </div>
           
           <div className="messages-container">
                {
                    message.map((messageValue, index) => (
                    <div className="message" key={index}>
                        <div className={`message-container-${messageValue.type}`}>
                            <p className="message-icon">HG</p>
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
                isLoading={isLoading} 
           />
        </div>
    );
}