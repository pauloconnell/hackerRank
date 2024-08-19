<script setup>
import { defineModel } from '@vue/composition-api';
let bigCandles=0;
const loading = ref(false);

const candleBox = defineModel();
const gotData = (data) =>{


    console.log("got input:",candleBox.value)
    let array = candleBox.value.split(" ").map(Number);
    console.log("sending array", {array})
    bigCandles = birthdayCakeCandles(array)
}

const birthdayCakeCandles = (candles) => {

    //handle edge cases
    loading.value = true;
    if(!candles.length) return undefined;
    if(candles.length > 100000) return undefined;
    console.log('input is ', candles, typeof(candles), candles.length );
    let maxIndex = candles.length-1;
    if (maxIndex == 0) return 1;
    // console.log('maxIndex is ', candles, maxIndex );
    candles = candles.sort((a,b)=>a-b);;
    console.log('input is ', candles, maxIndex );
    let totalCandles = 0;
    
    let bigCandle = Math.max(...candles);
    let firstIndex = candles.indexOf(bigCandle);
    let lastIndex = candles.lastIndexOf(bigCandle)
    console.log({candles}, {bigCandle}, {firstIndex}, {lastIndex});
    if( firstIndex == lastIndex){
        loading.value=false;
        return 1;
    }else{
        let totalCandles=0;
        for(let x=firstIndex; x< lastIndex+1; x++){
            if(candles[x]==bigCandle) totalCandles ++;
            console.log("found another big candle")
        }
        loading.value=false;
        return totalCandles;
    }
    
    
    //??if(candles[maxIndex]> 10000000) return undefined;
    // for(let x=0; x<=maxIndex; x++){
    //     console.log("max index ", maxIndex, "x is", x, "candle height is ", candles[maxIndex-x])
    //     if(candles[maxIndex-x] == candles[maxIndex]){
    //         totalCandles++;
    //          console.log("Got Onemax index ", maxIndex, "x is", x, "total is ", totalCandles);
    //     }
    // }
    // return totalCandles;
}
</script>

<template>
    <h1> Birthday Candles</h1>
    
    <div>
    Enter numbers to represent candle heights - the amount of the largest candles will be computed and output<br/>
    <input type="text" id="candles" name="candles" v-model="candleBox" @input="gotData" >
    <div>
    Total of Bigest candles is: <span v-if="loading">Loading...</span> <span v-else> {{ bigCandles }} </span>
    </div>
</div>
</template>