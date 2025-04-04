async function LongPollingrequest(id_conversation,myId,lastMessageDate,setNewMessage){
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
                const lastDate = data[data.length -1].sendAt
                lastMessageDate =lastDate
                setNewMessage(data)
            }
           
            await LongPollingrequest(id_conversation,myId,lastMessageDate)
        }
        else{
            await new Promise(resolve => setTimeout(resolve,500))
            await LongPollingrequest(id_conversation,myId,lastMessageDate)
        
        }
    }
    catch(error){
        console.error("Erreur de long polling ",error)
        await new Promise(resolve => setTimeout(resolve,500))
        await LongPollingrequest(id_conversation,myId,lastMessageDate)
    }
    

}