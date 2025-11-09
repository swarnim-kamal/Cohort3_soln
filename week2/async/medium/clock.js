
function showClock(){
    const now = new Date()
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const D = now.getDay();
    const M = now.getMonth();
    const Y = now.getFullYear();
    const time =  `${D}:${M}:${Y} ${h}:${m}:${s}`
    console.log(time)
    const lastSecond = 1000 - now.getMilliseconds()
    setTimeout(showClock,lastSecond)
}

showClock()



