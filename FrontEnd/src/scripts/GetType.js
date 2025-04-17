export default async function GetTypeFromExtensions(extensions,selectedFile,selectedAudio){
    if(selectedFile){
        if(extensions.includes("pdf")){
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
    else if (selectedAudio !== ""){
        return "audio"
    }
    return "text"
} 