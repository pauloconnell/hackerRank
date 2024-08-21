<script setup >
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();
const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    let array = inputBoxModel.value.split(" ").map(Number);                                     // convert string input into array of numbers
    console.log("sending array", {array})
    //bigCandles = birthdayCakeCandles(array)                                                 // invoke logic to determine answer

                                                                                                // ensure input box scales with input size
    console.log("chars in input is ", inputBoxModel.value.length)
    let minWidth = '170px';
    if(inputBoxModel.value.length  > 22){
        minWidth = `${inputBoxModel.value.length*7}px`;
    } 
    

    inputBoxRef.value.style.width = minWidth ;                        // expand input box based on how many characters are in the input
    console.log("width is ", inputBoxRef.value.style.width, inputBoxModel.value.length);
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
    <h1>Name</h1>
    
    <h3>Instructions.</h3>
    
    <div class="input-container">
        <div>
            Enter the ...
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel" @input="gotData" width="auto" >
    </div>
    <div>
    Total number of ... is: <span v-if="loading">Loading...</span> <span v-else>{{ bigCandles }} </span>
    </div>

</template>