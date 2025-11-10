/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
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
    const timeStart = Date.now()
    wait1(t1).then(result1 => {
        console.log("first result is : ", result1);
        return wait2(t2);    
    })
    .then(result2 => {
        console.log("second result is : ", result2);
        return wait3(t3);
    })
    .then(result3 => {
        console.log("third result is : ", result3);
        const timeLater = Date.now();
        const duration = timeLater-timeStart;
        console.log("All done!", duration)
    })
    .catch(err => {
        console.log("found error here : ", err)
    })
}

const t1 = 5000
const t2 = 5000
const t3 = 5000

calculateTime(t1,t2,t3)
// module.exports = calculateTime;
