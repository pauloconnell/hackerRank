<script setup>

import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();



function rgb(r, g, b) {
    console.log(r, g, b);
    function convertToNumber(string) {
        if (typeof string !== 'number') {
            string = +string;
         }
            if (typeof string !== 'number') {
                throw new Error('bad input');
             }
             if (string > 255) {
                return 255;
            }
            if (string < 1)
            return 0;
        return string;
    }
    function convertToHex(num) {
        num = convertToNumber(num); console.log({ num }) 
        if (num == 0) { 
            return "00"; 
        } 
        let hex = num.toString(16) 
        if (hex.length < 2) {
            hex = "0" + hex;
        } 
        console.log({ hex }) 
        return hex;
    } let R = convertToHex(r).toUpperCase(); 
    let G = convertToHex(g).toUpperCase(); 
    let B = convertToHex(b).toUpperCase(); 
    console.log(`${R}${G}${B}`) 
    return `${R}${G}${B}`;
}




const hexColor=ref();
const gotData = (data) => {


    console.log("got input:", inputBoxModel.value)
    let array = inputBoxModel.value.split(",").map(Number);                                     // convert string input into array of numbers
    console.log("sending input", { array})
    
   hexColor.value = rgb(...array)   ;                                            // invoke logic to determine answer

    // ensure input box scales with input size
    //console.log("chars in input is ", inputBoxModel.value.length)
    let minWidth = '170px';
    if (inputBoxModel.value.length > 22) {
        minWidth = `${inputBoxModel.value.length * 7}px`;
    }


    inputBoxRef.value.style.width = minWidth;                        // expand input box based on how many characters are in the input
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
  <h1>Convert To Hex</h1>

  <h3>Instructions.</h3>

  <div class="input-container">
    <div>Enter the rgb coma seperated color to convet to hex color.</div>
    <input
      ref="inputBoxRef"
      type="text"
      id="candles"
      name="candles"
      v-model="inputBoxModel"
      
      width="auto"
    />
  </div>
  <div>
    <button @click="gotData"> Calculate</button>
  </div>
  <div>
    Converted to hex is: <span v-if="loading">Loading...</span>
    <span v-else>{{ hexColor }} </span>
  </div>
</template>
