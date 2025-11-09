let cnt = 0;
function counter1() {
    setTimeout(() => {
        console.log("cnt is:", cnt);
        cnt += 1;
        counter1();
    }, 1000);
}

counter1();