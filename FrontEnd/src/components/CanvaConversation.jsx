// import { useState } from 'react'
import '../Styles/CanvaConversation.css'
import MessageBox from './MessageBox';
export default function CanvaConversation({id_conversation}){
    // const [message, setMessage] = useState([]);
    const message = [
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
    ]
    return(
        <div className="main-container-canva">
           <div className="headCanvaConversation">
                <p className="head-icon">HG</p>
                <p className="head-name">Galley Hugo et Flahaut Axel</p>
           </div>
           <div>
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

           </div>
        </div>
    )
    
}