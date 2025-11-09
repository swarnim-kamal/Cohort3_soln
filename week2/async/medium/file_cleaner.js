// JS library  
import fs from 'fs';

async function readFileContent(filePath, encoding){
    try {
        const data = await fs.promises.readFile(filePath, encoding)
        return data; 
    } catch (error) {
        console.log("error in reading file ", error)
        return null;
    }
    
}

function removeSpaces(content){
    const cleanContent = content.replace(/\s+/g, ' ');
    return cleanContent;
}

async function writeData(content, file_path){
    try {
        await fs.promises.writeFile(file_path, content)
        console.log("File written successfully")
    } catch (error) {
        console.log("getting error while writing in the file", error)
    }
}

let file_path = "file.txt"
let encoding = "utf-8"

// read the file content 
const read_data = await readFileContent(file_path, encoding)
console.log(read_data)

// remove extra spaces from the content
const cleaned_data = removeSpaces(read_data)
console.log("cleaned data is : ", cleaned_data)

//  write the cleaned content back to the file 
writeData(cleaned_data,file_path)
