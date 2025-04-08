import { GetInternMessageList } from "./Conversation";
import SendMessage, { CreateMessageInIndexed } from "./SendMessage";

async function SpamBilly(id_conversation,id_receiver,setMessage){
    for (let i = 0; i < 101; i++) {
        const result = await SendMessage("Billy",id_conversation,id_receiver)
        CreateMessageInIndexed(id_receiver,"Billy",result,id_conversation)
    }
    const updateMessageList = await GetInternMessageList(id_conversation)
    setMessage(updateMessageList)

}