import '../Styles/ConversationCard.css'

export default function ConversationCard({icon,title,LastMessagedate,body}){
    return(
        <div className='preview'>
            {/* <img src={img} alt=""/> */}
            <p className='preview-icon'>{icon}</p>
            <div className="preview-conv">
                <div className="preview-conv-head">
                    <p className="preview-conv-head-title">{title}</p>
                    <p className="preview-conv-head-LastMessagedate">{LastMessagedate}</p>
                </div>
                <p className="preview-conv-body">{body}</p>

            </div>
        </div>
    )
}