/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
    return new Promise( (resolve,reject) => {
        const end = Date.now()+t;
        while(Date.now()<end) {}
        resolve("wait1 done"); 
    })
}

function wait2(t) {
    return new Promise( (resolve,reject) => {
        const end = Date.now()+t;
        while(Date.now()<end) {}
        resolve("wait2 done"); 
    })
}

function wait3(t) {
    return new Promise( (resolve,reject) => {
        const end = Date.now()+t;
        while(Date.now()<end) {}
        resolve("wait3 done"); 
    })
}

function calculateTime(t1, t2, t3) {
    const startTime = Date.now() 
    return Promise.all([wait1(t1), wait2(t2), wait3(t3)])
    .then(results => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log("log", results)
        console.log("duration is ", duration)
        return results
    })
    .catch(error => {
        console.log(error)
        return error
    })
}

const t1 = 5000
const t2 = 5000
const t3 = 5000

calculateTime(t1,t2,t3);

// module.exports = calculateTime;