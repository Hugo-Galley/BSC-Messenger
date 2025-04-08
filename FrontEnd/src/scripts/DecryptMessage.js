async function importPrivateKey(privateKey){
    const header = "-----BEGIN PRIVATE KEY-----"
    const footer = "-----END PRIVATE KEY-----"

    const content = privateKey.replace(header, "").replace(footer, "").replace("/\\s/g", "")

    const binaryDer = Uint8Array.from(atob(content), c => c.charCodeAt(0))

    return window.crypto.subtle.importKey(
        "pkcs8",
        binaryDer.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        true,
        ["decrypt"]
    )
}

async function GetPrivateKey(){
    const storedUser = localStorage.getItem("user")
    const myUsername = storedUser ? JSON.parse(storedUser).username : ""

    return new Promise((resolve, reject) => {
        let request = indexedDB.open("UserDB",1)

        request.onerror = function(event) {
            console.error("Erreur lors de l'ouverture de la base de données ",event.target.error)
            reject(event.target.error)
        }

        request.onsuccess = function(event){
            const db = event.target.result
                try{
                    const transaction = db.transaction("User", "readwrite");
                    const store = transaction.objectStore("User");
                    const Getrequest = store.get(myUsername)

                    Getrequest.onsuccess = function (event) {
                        const data = event.target.result;
    
                        if (data && data.privateKey) {
                            console.log("Clé privée récupérée avec succès");
                            resolve(data.privateKey);
                        } else {
                            console.warn("Aucune clé privée trouvée");
                            reject("Clé privée introuvable");
                        }
                    };
                    Getrequest.onerror = function(event){
                        console.error("Erreur lors de la recherche de la clé primaire ",event.target.error)
                        reject(event.target.error)
                    }
                }
                catch(error){
                    console.error("Erreur lors de la récupération de la clée privé ",error)
                    reject(event.target.error)
                }
            
        }
    })

}
export default async function DecryptMessage(content) {
    try {
        const rawPrivateKey = await GetPrivateKey();
        const finalPrivateKey = await importPrivateKey(rawPrivateKey);
        console.log("Clé privée importée avec succès");

        const encryptedContent = Uint8Array.from(atob(content), c => c.charCodeAt(0));
        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            finalPrivateKey,
            encryptedContent
        );
        return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
        console.error("Erreur lors de la décryption : ", error);
        throw error;
    }
}