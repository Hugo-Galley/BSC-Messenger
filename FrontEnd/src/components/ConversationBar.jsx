import ConversationCard from "./ConversationCard";
import '../Styles/ConversationBar.css'
import {TextInput } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react'
import { IconEdit } from "@tabler/icons-react";

export default function ConversationBar(){
    const listOfConversation = [{
        "id" : "SuperId",
        "icon" : "HG",
        "title" : "Axel", 
        "lastMessageDate" : "Samedi",
        "body" : "Mon super message de test",
    },
    {
        "id" : "SuperId",
        "icon" : "HG",
        "title" : "Axel", 
        "lastMessageDate" : "Samedi",
        "body" : "Mon super message de test"
    },
    {
        "id" : "SuperId",
        "icon" : "HG",
        "title" : "Axel", 
        "lastMessageDate" : "Samedi",
        "body" : "Mon super message de test"
    },
    {
        "id" : "SuperId",
        "icon" : "HG",
        "title" : "Axel", 
        "lastMessageDate" : "Samedi",
        "body" : "Mon super message de test"
    },  
]
    const icon = <IconSearch size={16}/>;
 return(
    <div className="ConversationBar-container">
        <div className="searchbar-head">
            <TextInput 
            placeholder="votre conv"
            leftSection={icon}
            style={{width:300, marginRight:10}}
            radius={"md"}
            />
            <IconEdit size="35"/>
        </div>
        <div className="conversationBar-body">

        {
            listOfConversation.map((convCard, index) => (
                <a href={`https://galleyhugo.com/${convCard.id}`}
                 key={index} className="conversation-items"><ConversationCard  key={index}
                                                icon={convCard.icon}
                                                title={convCard.title} 
                                                LastMessagedate={convCard.lastMessageDate} 
                                                body={convCard.body}/></a>
            ))
        }
        </div>
        </div>

 )
}