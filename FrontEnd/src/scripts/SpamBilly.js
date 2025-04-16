import { GetInternMessageList } from "./Conversation";
import SendMessage, { CreateMessageInIndexed } from "./SendMessage";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function SpamBilly(id_conversation,id_receiver,setMessage){
        const result = await SendMessage("C'est partis pour le spam de Billy.",id_conversation,id_receiver,"text")
        CreateMessageInIndexed(id_receiver,"C'est partis pour le spam de Billy.",result,id_conversation,"text")
        let updateMessageList = await GetInternMessageList(id_conversation)
        setMessage(updateMessageList)

        await sleep(500)

    for (let i = 3; i >= 1; i--) {
        const result2 = await SendMessage(`${i}`,id_conversation,id_receiver,"text")
        CreateMessageInIndexed(id_receiver,`${i}`,result2,id_conversation,"text")
        updateMessageList = await GetInternMessageList(id_conversation)
        setMessage(updateMessageList)
        await sleep(1000)
    }

    for (let i = 0; i < 101; i++) {
        const result = await SendMessage("Billy",id_conversation,id_receiver,"text")
        CreateMessageInIndexed(id_receiver,"Billy",result,id_conversation,"text")

        if (i % 10 === 0) {
            updateMessageList = await GetInternMessageList(id_conversation);
            setMessage(updateMessageList);
        }
    }
    updateMessageList = await GetInternMessageList(id_conversation)
    setMessage(updateMessageList)

}