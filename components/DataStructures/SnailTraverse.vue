<script setup>
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();

const snailTraverse = function(array) {
  // our solution will have n*n numbers - this is STOP condition
  
  // our patern is 4 steps col to n, row to n, col -> start, row ->start+1 repeat
  
  console.log({array}, array.length)
  
  let n=array.length;
  
  if (n==0) return [[]];
  if (n==1) return array[0];
  let stop = n*n;
  let solution=[];
  let row=0
  let rowStart=0;
  let rowStop=n-1;
  let col=0;
  let colStart=0;
  let colStop=n-1;
  
  console.log({stop}, {solution})
  while(stop > solution.length){
      console.log({stop}, {solution})
    //iterate across cols
    for(let i=colStart; i<=colStop; i++){
    
      solution.push(array[rowStart][i])
       // console.log(rowStart,i,  {solution}, array[rowStart][i])
    }
    rowStart++;
    for(let i=rowStart; i<=rowStop; i++){
      
      solution.push(array[i][colStop])
     // console.log(i, colStop, {solution})
    }
    colStop--;
    //now backwards L section
    for(let i=colStop; i>=colStart; i--){
      
      solution.push(array[rowStop][i])
    //  console.log(rowStop, i, {solution})
    }
    rowStop--;
    for(let i=rowStop; i>=rowStart; i--){
      
      solution.push(array[i][colStart])
     // console.log(i, colStart, {solution})
    }
    colStart++;
    }
 // console.log({ solution });
  return solution
  }


const snail=ref([]);

const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    //let array = inputBoxModel.value.split(" ").split(",").map(Number);                                     // convert string input into array of numbers
    let array=JSON.parse(inputBoxModel.value)
    console.log("sending array", array)
    snail.value = snailTraverse(array)  ;                                               // invoke logic to determine answer

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
    <h1>Snail Traverse</h1>
    
    <h3>Instructions.</h3>
    
    <div class="input-container">
        <div>
            Enter the n x n array that will be traveresed in a snail pattern
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel"  width="auto" >
    </div>
    <div>
        <button @click="gotData">Click to calculate</button>
    </div>
    <div>
    Total number of ... is: <span v-if="loading">Loading...</span> <span v-else>{{ snail }} </span>
    </div>

</template>