import '../Styles/PopupNewConversation.css'
import { useState, useEffect } from "react";
import getInformations from '../scripts/GetInformations';

export default function PopUpNewConversation({ onClose }){
    const [listOfUSer, setListOfUser] = useState([])
    const [sortList, setSortList] = useState([])
    function sortUser(event, users){
        setSortList(listOfUSer)
        setSortList(users.filter(user => user.username.toLowerCase().includes(event.target.value.toLowerCase())))
    }
    useEffect(() => {
        async function fetchUsers(){
            try {
                const users = await getInformations("http://localhost:8000/users/all")
                setListOfUser(users)
                setSortList(users)
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error)
            }
        }
        fetchUsers()
    }, [])
    return(
            <div className="popup-body">
                <div className="close-button-container">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
            <h3 className="popup-title">Nouveau Message</h3>
            <div className="popup-textInput">
                <p className="A">À :</p>
                <input placeholder="Rechercher" className="inputSearch"  onChange={() => sortUser(event,listOfUSer)}/>
            </div>
       
        <div className="popup-contact-list">
            <p className="popup-contact-list-title">Suggestions</p>
            {
                sortList.map((user,index) =>(
                    <a href="https://apple.com" key={index} className="contact-item">
                        <p className="popup-contact-list-icon">{user.icon}</p>
                        <p className="popup-contact-list-name">{user.username}</p>
                    </a>
                ))
            }
        </div>
            </div>
    )
}