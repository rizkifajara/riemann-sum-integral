const express = require('express')
const app = express()
const port = 3000

function inputFunc(x) {
    // for my function, it's arcsin(sqrt(x))
    return Math.asin(Math.sqrt(x));
}

async function riemannSum(totalPartParam, prevSumParam) {
    let prevSum = prevSumParam
    let max = 1
    let min = 0
    let totalPart = totalPartParam
    let sum = 0;
    let dX = (max - min) / totalPart;
    let currX = min + dX / 2;
    for (let part = 0; part < totalPart; part++) {
        let currY = inputFunc(currX);

        sum += dX * currY;
        currX += dX;
    }

    // check error
    if(Math.abs(sum - prevSum) < 0.000000001) {
        return totalPartParam
    } else {
        return riemannSum(totalPartParam+1, sum)
    }
}


app.get('/', async(req, res) => {
    let result = await riemannSum(1,0)
    console.log(result)
    res.json('minimum n needed so that error < 10^-9 : '+result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})