export default async function getConversation(id_conversation){
    let messageList = []
     const storedUser = localStorage.getItem("user")
     const myid = storedUser ? JSON.parse(storedUser).id : ""

     try{
        const response = await fetch("http://localhost:8000/conversation/allMessage", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id_conversation
            }),
        })
        if (!response.ok){
            return [false,false]
        }
        const infoResponse = await fetch("http://localhost:8000/conversation/info", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            'body' : JSON.stringify({
                id_conversation
            })
        })
        if (!infoResponse.ok){
            return [false,false]
        }
        const data = await response.json()
        const infoData = await infoResponse.json()
        for (let i = 0; i < data.length; i++) {
            const dico = {
                "content" : data[i].content,
                "sendAt" : data[i].sendAt,
                "type" : "",
                "icon" : data[i].icon
            }
            if (data[i].id_receiver === myid){
                dico.type = "received"
            }
            else{
                dico.type = "sent"
            }
            messageList.push(dico)
        }
    
        return [messageList,infoData]
     }
     catch(error){
        console.error("Erreur lors de la recupérations des conversations: ", error)
        return [false, false]
     }
    
    
    
}