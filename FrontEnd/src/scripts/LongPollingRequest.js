import { CreateMessageInIndexed } from "./SendMessage"
export default async function LongPollingrequest(id_conversation,myId,lastMessageDate,setMessage, isActive = true){
    
    if(!isActive){
        console.log("Fin de la Long polling pour la conversation ",id_conversation)
        return
    }
    
    try{
        const response = await fetch("http://localhost:8000/conversation/allMessage", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id_conversation : id_conversation,
                myId : myId,
                lastMessageDate : lastMessageDate
            })
        })
    
        if(response.status === 200){
            const data = await response.json()
            if (data.length > 0){
                for (let message of data){
                    try{
                        await CreateMessageInIndexed(message.id_receiver,message.content, message.id_message,message.id_conversation )
                    }
                    catch(error){
                        if(!error.message.includes("Key already exists")){
                            console.error("Erreur IndexDb ", error)
                        }
                    }
                    setMessage((prevListe) => [...prevListe, message])
                console.log("les messages récupéré sont : ", message)
                }
                const lastDate = data[data.length -1].sendAt
                lastMessageDate =lastDate
               
                
            }

            await new Promise(resolve => setTimeout(resolve,500))
            await LongPollingrequest(id_conversation,myId,lastMessageDate,setMessage,isActive)
        }
        else{
            await new Promise(resolve => setTimeout(resolve,1000))
            await LongPollingrequest(id_conversation,myId,lastMessageDate,setMessage,isActive)
        
        }
    }
    catch(error){
        console.error("Erreur de long polling ",error)
        await new Promise(resolve => setTimeout(resolve,2000))
        await LongPollingrequest(id_conversation,myId,lastMessageDate,setMessage,isActive)
    }
    

}