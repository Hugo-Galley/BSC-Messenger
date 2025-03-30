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
        const infoDataFinalze = {
            "name" : infoData.name,
            "icon" : infoData.icon,
            "myId" : myid,
            "herId" : ""
        }
        if (infoData.id_user1 === myid){
            infoDataFinalze.herId = infoData.id_user2
        }
        else{
            infoDataFinalze.herId = infoData.id_user1
        }
        console.log(data)
        console.log(infoData)
        if (data.empty === "true"){
            return [[], infoDataFinalze] 
        }
        messageList.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt))
        return [messageList,infoDataFinalze]
     }
     catch(error){
        console.error("Erreur lors de la recupérations des conversations: ", error)
        return [false, false]
     }
}

export async function CreateConversation(id_user){
    const storedUser = localStorage.getItem("user")
    const myid = storedUser ? JSON.parse(storedUser).id : ""

    const response = await fetch("http://localhost:8000/conversation/new", {
        method : 'POST',
        headers : {
             'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id_user1 : myid,
            id_user2 : id_user
    })
    })
    if (!response.ok){
        console.error("Erreur lors de la création d'une conversation")
    }
    const data = await response.json()
    if (data.succes === "true"){
        return data.id_conversation
    }
    else{
        return ""
    }

}