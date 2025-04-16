import '../Styles/MessageBox.css'

export default function MessageBox({content, sendAt,type, dataType}){
    console.log("le type est ",dataType)
    return(
        <div className={`messageBox ${type}`}>
            
            {
                dataType === "image" ? (
                    <img src={content} alt="Image envoyé" />
                ) : (
                        <p className="messageText">{content}</p>
                )
            }
            
            <p className="messageTime">{sendAt}</p>
        </div>
    )
}