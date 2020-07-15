const axios = require('axios');



const N = 100;
const arr = Array.from({ length: N }, (_, index) => index + 1);

// const promises = arr.map(() => axios.get('http://localhost:8000/api/benchmarkparallel'));

// console.log(promises);

(async () => {
   /*
    console.time();
    await Promise.all(promises)
    console.timeEnd(); */
    console.log('starting timer');
    console.time()
    for(let i in arr){
        await axios.get('http://localhost:8000/api/benchmarkserial')
    }
    console.timeEnd()
})()
