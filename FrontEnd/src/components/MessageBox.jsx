import '../Styles/MessageBox.css'

export default function MessageBox({content, sendAt, type}){
    return(
        <div className={`messageBox ${type}`}>
            <p className="messageText">{content}</p>
            <p className="messageTime">{sendAt}</p>
        </div>
    )
}