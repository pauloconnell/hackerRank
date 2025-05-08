<script setup >
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();


function sortBytes(uint32) {
  //console.log(uint32)
  let hex = uint32.toString(16).padStart(8,0);
  //console.log(hex)
  let ans=hex.split('').map(digit=>{
    //console.log(digit)
    return parseInt(digit,16).toString(2).padStart(4,0);
  })
  // break into 8 bit bytes 
  //console.log("break me",ans)
  // break into bytes
  ans[0]=ans[0]+ans[1]
  ans[1]=ans[2]+ans[3]
  ans[2]=ans[4]+ans[5]
  ans[3]=ans[6]+ans[7]
 ans.length=4;
  //console.log("length 4?",ans)
  
  // sort bytes
  
  ans.sort();
  ans.reverse();
  //console.log("sorted",ans);
  ans=ans.join("");
    ans=parseInt(ans,2)
  //console.log("final",ans)
  return ans;// uint32;
}



const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    let array = inputBoxModel.value;//.map(Number);                                     // convert string input into array of numbers
    console.log("sending 32bit number", {array})
    bigCandles =sortBytes(array)                                                 // invoke logic to determine answer

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