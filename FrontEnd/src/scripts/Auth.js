import { CreateUserInIndexeed } from "./CreateUserInIndexed"

export default async function LoginUser(username, password, event){
    event.preventDefault()
    try {
        const response = await fetch("http://localhost:8000/users/auth", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username,
                password
            }),
        })
        const data = await response.json()

        if (data.authorize === "true"){
            console.log("Autentification réussie")
            const userRequest = await fetch("http://localhost:8000/users/", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username
                })
            })
            const userData = await userRequest.json()

            localStorage.setItem(
                'user',
                JSON.stringify({
                    id : userData.id,
                    username : userData.username,
                    icon : userData.icon
                })
            )
            return userData
        }
        else{
            console.error("Autentification échoué")
            return false
        }

    } catch (error) {
        console.error("Erreur de l'authtification d'un utilisateur : ", error)
    }
}
export async function RegisterUser(username, password, icon, event ){
    event.preventDefault()
    try {
        const publicKey = await CreateUserInIndexeed(username)
        console.log("Clé public vaux ", publicKey)
        console.log("envoie de la requete")
        const response = await fetch("http://localhost:8000/users/register", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username,
                password,
                publicKey,
                icon

            }),
        })
        console.log("Reponse ", response.status)
        const data = await response.json()
        console.log("donnée recu ",data)

        if (data.exist === "true"){
            return ["L'utilisateur existe déja",false]
        }
        else{
            return ["Inscription réussi",true]
        }


    } catch (error) {
        console.error("Erreur de l'authtification d'un utilisateur : ", error)
    }
}