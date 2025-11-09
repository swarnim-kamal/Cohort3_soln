
function sleep(waitTime){
    // sleep for waittime , but during this the main thread should be completely blocked and we have to use promise in this 
    return new Promise(resolve => {
        const end = Date.now()+waitTime;
        while(Date.now()<end) {}
        resolve(); 
    });
}

const waitTime = 10000
console.log("waiting started ... ")
await sleep(waitTime)
console.log("waiting completed ... ")


// module.exports = sleep