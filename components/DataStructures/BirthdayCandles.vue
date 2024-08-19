<script setup>
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';
let bigCandles=0;
const loading = ref(false);
const inputCandleRef = ref(null);

const candleBoxModel = defineModel();
const gotData = (data) =>{


    console.log("got input:",candleBoxModel.value)
    let array = candleBoxModel.value.split(" ").map(Number);                                     // convert string input into array of numbers
    console.log("sending array", {array})
    bigCandles = birthdayCakeCandles(array)                                                 // invoke logic to determine num of max sized candles

    console.log("chars in input is ", candleBoxModel.value.length)
    let minWidth = '170px';
    if(candleBoxModel.value.length  > 22){
        minWidth = `${candleBoxModel.value.length*7}px`;
    } 
    

    inputCandleRef.value.style.width = minWidth ;                        // expand input box based on how many characters are in the input
    console.log("width is ", inputCandleRef.value.style.width, candleBoxModel.value.length);
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
    
    
  
}
</script>

<!-- <style>
.input-container {
    display: flex;
}
input {
    flex: 1;
}
</style> -->

<template>
    <h1> Birthday Candles</h1>
    
    
    Enter numbers to represent candle heights - the amount of the largest candles will be computed and output<br/>
    <div class="input-container">
        <input ref="inputCandleRef" type="text" id="candles" name="candles" v-model="candleBoxModel" @input="gotData" width="auto" >
    </div>
    <div>
    Total of Bigest candles is: <span v-if="loading">Loading...</span> <span v-else> {{ bigCandles }} </span>
    </div>

</template>