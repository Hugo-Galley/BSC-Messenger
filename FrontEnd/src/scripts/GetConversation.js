import getInformations from "./GetInformations";


export default function getConversation(id_user){
    const data = getInformations("http://localhost:8000/conversation/allMessage")
    
}