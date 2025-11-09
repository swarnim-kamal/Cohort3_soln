import fs from 'fs/promises';


function writefile(path, encoding){
    return fs.appendFile(path, "Hello World", {encoding: encoding}).then(
        () =>{
            return "File has been written Successfully"
        } 
    ).catch((err)=>{
        throw err;
    });
}



async function readfile(path, encoding){
    const data = fs.readFile(path, encoding);
    console.log("****file has been read***");
    let len = (await data).length;
    console.log("Length of file is:", len);
}

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

console.log("Start");
sleep(200);
console.log("End");
readfile("nice1.txt", "utf-8");
console.log("After readfile");
console.log("After readfile1");

writefile("nice.txt", "utf-8").then((msg)=>{
    console.log(msg);
}).catch((err)=>{
    console.log("Error is:", err);
});

console.log("After writefile");
console.log("After writefile 1");

// for(let i=0;i<100;i++){
//     console.log("Hello", i);
// }