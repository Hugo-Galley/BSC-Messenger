import { useState} from "react";
import '../Styles/MessageInput.css';
import SendMessage from "../scripts/SendMessage";
import { CreateMessageInIndexed } from "../scripts/SendMessage";

export default function MessageInput({conversationId, conversationInfo, onMessagesent}) {
    const [message, setMessage] = useState(''); 
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setpreviewUrl] = useState('')
    const [base64File, setbase64File] = useState(null)

    async function SendMessageInConversation(e){
        e.preventDefault()
        if (!conversationInfo || !conversationInfo.herId) {
            console.log("la valeur de conversationInfo est ",conversationInfo)
            console.error("Information de conversation manquante");
            return;
        }

        const result = await SendMessage(base64File ? base64File : message, conversationId, conversationInfo.herId,selectedFile ? "image" : "text")
        if (result !== "") {
            await CreateMessageInIndexed(conversationInfo.herId,base64File ? base64File : message,result,conversationId,selectedFile ? "image" : "text")
            setMessage("")
            setSelectedFile(null)
            setpreviewUrl('')
            setbase64File(null)
            
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

    function onSelectedFile(event){
        const file = event.target.files[0]
        if (file){
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onload =() => {
                const base64Img = reader.result
                setbase64File(base64Img)
            }
            reader.onerror = (error) => {
                console.error("Erreur lors de la coversion de l'image en base64 ", error)
            }
            reader.readAsDataURL(file)

            const fileUrl = URL.createObjectURL(file)
            setpreviewUrl(fileUrl)
            console.log("L'url est ",fileUrl," et le fichier est ",file)
        }

    }


    return (
        <div className="message-input-container">
            {
                    previewUrl && (
                        <div className="image-preview">
                            <img src={previewUrl} alt="Preview de l'image" style={{maxWidth:'200px',maxHeight: '300px' }} />
                            <button
                            type="button"
                            className="remove-image"
                            onClick={() => {
                                setSelectedFile(null)
                                setpreviewUrl('')
                            }
                            }>
                                X
                            </button>
                        </div>
                    )
                }
            <form onSubmit={SendMessageInConversation} className="message-form">
                <div className="file-input-wrapper">
                    <input 
                        type="file" 
                        id="file-input" 
                        className="hidden-file-input" 
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={onSelectedFile}
                    />
                    <label htmlFor="file-input" className="file-input-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                        </svg>
                    </label>
                </div>
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
                    disabled={message.trim() === '' && !selectedFile}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
}