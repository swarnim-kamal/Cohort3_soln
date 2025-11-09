function countVowels(str) {
    // Your code here
    vowels = ['a', 'e', 'i', 'o', 'u']
    let count = 0
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++
        }
    }
    return count
}

s = "teri bhai ka baap"

console.log(countVowels(s))

function isPalindrome(str) {
    let i = 0,j=str.length -1;
    while(i<j){
        if(str[i] !== str[j]){
            return false;
        }
        i++;
        j--;
    }
    return true;
}

s = "aabbbaa"

console.log(isPalindrome(s))

function calculateTime(n) {
    let start = performance.now();
    let sum =0;
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    let end = performance.now();
    console.log(end - start);
    return end - start;
}

n = 100000000000

console.log(calculateTime(n))


module.exports = countVowels
module.exports = isPalindrome
