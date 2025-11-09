
function counter(){
    let cnt = 0;
    setInterval(() => {
        console.log("cnt is:", cnt);
        cnt += 1;
    }, 1000);
}

counter();
