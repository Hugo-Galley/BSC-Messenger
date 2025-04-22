export default async function GetTypeFromExtensions(extensions,selectedFile){
    console.log("Je compare avec le type : ",extensions)
    if(selectedFile){
        if(extensions.includes("application")){
            return "pdf"
        }
        else if (extensions.includes("mpeg")){
            return "audio"
        }
        else if (extensions.includes("mp4")){
            return "video"
        }
        else{
            return "image"
        }
    }
    
    return "text"
} 