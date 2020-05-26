
const promise1 = new Promise((resolve, reject) => {
    // some long running result that eventually does one of two things:
    setTimeout(() => {
        const result = false;
        if(result){
            resolve('1. This is my resolve data');
        }else {
            reject('1. There was an exception!');
        }
    }, 5000);
});

console.log("Start");

promise1.then((data) => {
    console.log('1. It succeeded with ' + data);
}, (error) => {
    console.error("1. It failed with " + error);
});

promise1.then((data) => {
    console.log('2. It succeeded with ' + data);
}, (error) => {
    console.error("2. It failed with " + error);
});


console.log("End");