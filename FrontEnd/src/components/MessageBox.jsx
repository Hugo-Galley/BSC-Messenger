import '../Styles/MessageBox.css'

export default function MessageBox({content, sendAt,type, dataType}){
    return(
        <div className={`messageBox ${type}`}>
            
            {dataType === "image" ? (
                <img src={content} alt="Image envoyé" />
            ) : dataType === "text" ? (
                <p className="messageText">{content}</p>

            ) : dataType === "audio" ?(
               <audio controls>
                    <source src={content} type="audio/mpeg"/>
               </audio>
            ) : dataType === "video" ?(
               <video controls style={{maxHeight:'300px'}}>
                    <source src={content} type='video/mp4'/>
               </video>
            ) : (
                <div className="document-container">
                    <a href={content} download target="_blank" rel="noonpener noreferer" className="document-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0"/>
                        </svg>
                        Telecharger le document
                    </a>
                </div> 
            )
            }
            
            <p className="messageTime">{sendAt}</p>
        </div>
    )
}