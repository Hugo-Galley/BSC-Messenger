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
                "icon" : data[i].icon,
                "id_message" : data[i].id_message
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
            "herId" : "",
            "id_message" : data.id_message
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
        const finalList = await GetFinalMessageList(messageList)
        console.log("la liste de message est ",finalList)
        return [finalList,infoDataFinalze]
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
async function GetFinalMessageList(messageList){
    return new Promise((resolve,reject) => {
        let request = indexedDB.open("UserDB", 2);

        request.onerror = function(event) {
            console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = function(event){
            let db = event.target.result
            let transaction = db.transaction("Conversation","readonly")
            let store = transaction.objectStore("Conversation")

            let completeOperations = 0;

            if (messageList.length === 0){
                resolve(messageList)
                return
            }
            
            for (let i = 0; i < messageList.length; i++) {
                const id_message = messageList[i].id_message;
                console.log("L'id du message est ",id_message)
                let getRequest = store.get(id_message)
                getRequest.onsuccess = function(){
                    if(getRequest.result){
                        console.log("Le contenu est ",getRequest.result.content)
                        messageList[i].content = getRequest.result.content
                        console.log("le contenu de messagelist[i] est ",messageList[i].content)
                    }
                    else{
                        console.log("Message non trouvé")
                    }
                    completeOperations++
                    if (completeOperations === messageList.length){
                        resolve(messageList)
                    }

                }
                getRequest.onerror = function(event) {
                    console.error("Erreur lors de la recherche de clé", event.target.error);
                    completeOperations++
                    if (completeOperations === messageList.length){
                        resolve(messageList)
                    }

                };
                
            }
            transaction.oncomplete = function(){
                db.close()
            }
        }
    })
}