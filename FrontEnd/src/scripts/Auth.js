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
                    username : userData.username
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
        const publicKey = CreateUserInIndexeed(username)
        const response = await fetch("http://localhost:8000/users/register'", {
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
        const data = await response.json()

        if (data.exist === "true"){
            return ("L'utilisateur existe déja",false)
        }
        else{
            return true
        }

        


    } catch (error) {
        console.error("Erreur de l'authtification d'un utilisateur : ", error)
    }
}