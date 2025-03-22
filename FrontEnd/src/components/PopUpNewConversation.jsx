import {TextInput, CloseButton } from "@mantine/core";
import '../Styles/PopupNewConversation.css'
import { useState, useEffect } from "react";
import getAllUsers from "../scripts/GetAllUsers";

export default function PopUpNewConversation({ onClose }){
    const [listOfUSer, setListOfUser] = useState([])
    useEffect(() => {
        async function fetchUsers(){
            try {
                const users = await getAllUsers()
                setListOfUser(users)
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error)
            }
        }
        fetchUsers()
    }, [])
    return(
            <div className="popup-body">
                <div className="close-buttton-container">
                    <CloseButton size={34} className="close-button" style={{background:"#FA8072",margin:10}} onClick={onClose} classNames={"close-button"}/>
                </div>
            <h3 className="popup-title">Nouveau Message</h3>
            <div className="popup-textInput">
                <p className="A">À :</p>
                <TextInput placeholder="Rechercher" className="inputSearch"/>
            </div>
       
        <div className="popup-contact-list">
            <p className="popup-contact-list-title">Suggestions</p>
            {
                listOfUSer.map((user,index) =>(
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