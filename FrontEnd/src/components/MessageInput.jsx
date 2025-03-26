import { useState} from "react";
import '../Styles/MessageInput.css';

export default function MessageInput({ onSendMessage}) {
    const [message, setMessage] = useState(''); 



    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message.trim());
        setMessage('');
    };


    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-form">

                <div className="input-wrapper">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez un message..."
                        className="message-textarea"
                    />
                </div>
                
                <button
                    type="submit"
                    className="send-button"
                   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>

                </button>
            </form>
            
        
        </div>
    );
}