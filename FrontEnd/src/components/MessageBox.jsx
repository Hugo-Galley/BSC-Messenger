import '../Styles/MessageBox.css'

export default function MessageBox({content, sendAt,type, dataType}){
    return(
        <div className={`messageBox ${type}`}>
            
            {dataType === "image" ? (
                <img src={content} alt="Image envoyé" />
            ) : dataType === "pdf" ? (
                <iframe src={content} />
            ) : dataType === "audio" ?(
               <audio controls>
                    <source src={content} type="audio/mpeg"/>
               </audio>
            ) : dataType === "video" ?(
               <video controls style={{maxHeight:'300px'}}>
                    <source src={content} type='video/mp4'/>
               </video>
            ) : (
                <p className="messageText">{content}</p>
            )
            }
            
            <p className="messageTime">{sendAt}</p>
        </div>
    )
}