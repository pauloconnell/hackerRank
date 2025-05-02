<script setup >
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();


function solution(text, markers) {
  // check format of text
  console.log({text}, markers)
  
  // split on line breaks
  let arr = text.split('\n')
  console.log({arr})
  // split on comments and remove commented out text
  for(let x=0; x<arr.length; x++){
    
    for(marker of markers){
       arr[x] = arr[x].split(`${marker}`)[0];
    }
   
    arr[x] = arr[x].replace(/\s+$/, "");  // remove trailing spaces
  }
  
  let answer = arr.join('\n')
  //return text without comments
  console.log("ans is ", answer)
  return answer;//arr.toString();
  
}



const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    let array = inputBoxModel.value.split(" ").map(Number);                                     // convert string input into array of numbers
    console.log("sending array", {array})

    // todo hook up this function to this component:
    bigCandles = solution(array)                                                 // invoke logic to determine answer

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