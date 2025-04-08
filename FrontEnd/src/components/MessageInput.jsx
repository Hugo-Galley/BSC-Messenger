import { useState} from "react";
import '../Styles/MessageInput.css';
import SendMessage from "../scripts/SendMessage";
import { CreateMessageInIndexed } from "../scripts/SendMessage";
import { SpamBilly } from "../scripts/SpamBilly";

export default function MessageInput({conversationId, conversationInfo, onMessagesent}) {
    const [message, setMessage] = useState(''); 

    async function SendMessageInConversation(e){
        e.preventDefault()
        if (!conversationInfo || !conversationInfo.herId) {
            console.log("la valeur de conversationInfo est ",conversationInfo)
            console.error("Information de conversation manquante");
            return;
        }
        const result = await SendMessage(message, conversationId, conversationInfo.herId)
        if (result !== "") {
            await CreateMessageInIndexed(conversationInfo.herId,message,result,conversationId,"sent")
            setMessage("")
            if (onMessagesent){
                onMessagesent()
            }
        } else {
            console.error("Erreur lors de l'envoi du message");
        }
    }

    function sendWithEnterKey(e){
        if (e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            if (message.trim() !== ''){
                SendMessageInConversation(e)
            }
        }
    }



    return (
        <div className="message-input-container">
            <form onSubmit={SendMessageInConversation} className="message-form">

                <div className="input-wrapper">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez un message..."
                        className="message-textarea"
                        onKeyDown={sendWithEnterKey}

                    />
                </div>
                
                <button
                    type="submit"
                    className="send-button"
                    disabled={message.trim() === ''}
                   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>

                </button>
            </form>
            
        
        </div>
    );
}