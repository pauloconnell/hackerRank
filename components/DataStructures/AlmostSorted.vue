<script setup >
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const getSort = ref("");
const inputBoxRef = ref(null);
const inputBoxModel = defineModel();
const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    let array = inputBoxModel.value.split(" ").map(Number);                                     // convert string input into array of numbers
    console.log("sending array", {array})
    getSort.value = almostSorted(array);                                                 // invoke logic to determine answer

                                                                                                // ensure input box scales with input size
    console.log("chars in input is ", inputBoxModel.value.length)
    let minWidth = '170px';
    if(inputBoxModel.value.length  > 22){
        minWidth = `${inputBoxModel.value.length*7}px`;
    } 
    

    inputBoxRef.value.style.width = minWidth ;                        // expand input box based on how many characters are in the input
    console.log("width is ", inputBoxRef.value.style.width, inputBoxModel.value.length);
}

function almostSorted(arr) {
    // Write your code here
    let badIndex=[];
    
    //console.log("got", arr, arr.length)
    // Case: check if already sorted:
    if(arr.length==1){          // edge case - single number is already sorted
       console.log("yes");
      return 'yes'  
    } 
    let ans = checkIfSorted(arr);
    if(ans){
        console.log("yes");
        return 'yes'    // if already sorted return 'yes'
    } 
    
    function checkIfSorted(array) {
        

       for(let x=0; x< array.length-1; x++){
            
                if(array[x]>array[x+1]){
                   // console.log("not sorted")
                    return false;
                } 
            
        }
        return true;
        
    }
    
    
    // case can arr be sorted by swapping 2 elements
    
    let left= 0;
    let right=arr.length -1;
    
    while(left < right){
        if (arr[left] > arr[right]){
            badIndex.push(left);
            badIndex.push(right);
        }
        left++;
        right--;
           
    }
     if(badIndex.length > 0){
         let bad1 = arr[badIndex[0]];
         let bad2 = arr[badIndex[1]];
         arr[badIndex[0]]= bad2;
         arr[badIndex[1]]= bad1; 
        // console.log("now arr = ", arr)
        if(checkIfSorted(arr)){
            console.log("yes");
            console.log("swap", badIndex[0]+1, badIndex[1]+1);  // question assumes index starts at 1 (instead of 0)
            return ('swap',badIndex[0]+1, badIndex[1]+1 );
        } else console.log("no");
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
    <h1>Almost Sorted</h1>
    
    <h3>Given an array of integers, determine whether the array can be sorted in ascending order using only one of the following operations one time.

Swap two elements.
Reverse one sub-segment.</h3>
    
    <div class="input-container">
        <div>
            Enter the ...
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel" @input="gotData" width="auto" >
    </div>
    <div>
    Total number of ... is: <span v-if="loading">Loading...</span> <span v-else>{{ getSort }} </span>
    </div>

</template>