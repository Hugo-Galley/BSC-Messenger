export default async function SendMessage(content, id_conversation, id_receiver){
    const date = new Date()
    const sendAt = date.toISOString().split('T')[0]
    try {
        const response = await fetch("http://localhost:8000/conversation/addMessage",{
            method: 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id_receiver : id_receiver,
                content : content,
                sendAt : sendAt,
                id_conversation : id_conversation
            })
        })
        if (!response.ok){
            return false
        }
        return true
    } catch (error) {
        console.log("Erreur lors de l'envoie du message ", error)
        return false
    }
}