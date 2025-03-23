async function getInformations(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Erreur : ', error)
    }
}
export default getInformations