export default async function SendMessage(content, id_conversation, id_receiver){
    try {
        console.log("L'id récupére lors de l'envoie du message est ", id_conversation, content, id_receiver)
        const response = await fetch("http://localhost:8000/conversation/addMessage",{
            method: 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id_receiver : id_receiver,
                content : content,
                id_conversation : id_conversation
            })
        })
        if (!response.ok){
            return false
        }
        const data = await response.json()

        if (data.succes === "true"){
            return data.id_message
        }
        else{
            console.error("Reponse invalide de l'API")
            return ""
        }
       
    } catch (error) {
        console.log("Erreur lors de l'envoie du message ", error)
        return false
    }
}
export async function CreateMessageInIndexed(receiver,content,id_message,id_conversation){
    const sendAt = new Date().toISOString().split('.')[0].replace('T', ' ');
    return new Promise((resolve, reject) => {        
        let request = indexedDB.open("UserDB", 1);

        request.onupgradeneeded = function(event) {
            let db = event.target.result
            if(!db.objectStoreNames.contains("Conversation")){
                db.createObjectStore("Conversation", { keyPath: "id_message" });
            }
        };
            request.onerror = function(event) {
                console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
                reject(event.target.error) 
            };
    
            request.onsuccess = function(event) {
                let db = event.target.result;
                try {
                    if (!db.objectStoreNames.contains("Conversation")) {
                        console.error("Le magasin d'objets 'Conversation' n'existe pas");
                        reject(new Error("Le magasin d'objets 'Conversation' n'existe pas"));
                        return;
                    }
                    let message = {
                        id_message : id_message,
                        receiver : receiver,
                        content : content,
                        datetime : sendAt,
                        id_conversation : id_conversation,
                        type : ""
                    }
    
                    let transaction = db.transaction("Conversation", "readwrite");
                    let store = transaction.objectStore("Conversation");
                    let addRequest = store.add(message);
    
                    addRequest.onsuccess = function() {
                        console.log("Message ajouté avec succès !");
                        resolve(true)
                    };
                    
                    addRequest.onerror = function(event) {
                        console.error("Erreur lors de l'ajout du message:", event.target.error);
                        reject(event.target.error)
                    };
    
                } catch (error) {
                    console.error("Une erreur est survenu ", error)
                    reject(error)
                }
            }
    })
    
    }

