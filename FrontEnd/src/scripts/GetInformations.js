async function getInformations(url){
    const storedUser = localStorage.getItem("user")
    const myId = storedUser ? JSON.parse(storedUser).id : ""
    try {
        const response = await fetch(url, {
            "method" : 'POST',
            "headers" : {
                'Content-Type' : 'application/json'
            },
            "body" : JSON.stringify({
                myId : myId
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Erreur : ', error)
    }
}
export default getInformations

export async function GetConversationsBar(url){

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Erreur : ', error)
    }

}