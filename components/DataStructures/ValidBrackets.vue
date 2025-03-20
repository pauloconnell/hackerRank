<script setup>
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();



function validBraces(braces) {
    //TODO ensure that the sequence of brackets make logical sense = true, else return false 
   
    let array = braces.split('');
    let solution = [];
    let answer = true;
    for (let [index, el] of array.entries()) {
        if (el == "(" || el == "[" || el == "{") {
            solution.push(el);                        // if open bracket, push onto solution stack
            continue;
        } else if (index == 0 || solution.length == 0) {                    // if first element isn't open bracket, return false
            solution.push(el);
            answer = false;
            break;
        }
        if (solution[solution.length - 1] == "(" && el == ")") {
            solution.pop();                           // if we closed our bracket pop it off stack
            console.log({ solution })
            continue;
        }
        if (solution[solution.length - 1] == "[" && el == "]") {
            solution.pop();
            continue;
        }
        if (solution[solution.length - 1] == "{" && el == "}") {
            solution.pop();
            continue;
        }
        solution.push(el)
        answer = false;          // we have a closing bracket without matching opening bracket = false
        break;
    }

    if (answer == true && solution.length == 0) {
        answer = true;
    } else answer = false
    return answer;
}


const answer = ref();
const gotData = (data) => {

    let array = inputBoxModel.value.split(" ").map(Number);                                     // convert string input into array of numbers
    answer.value = validBraces(inputBoxModel.value);
    // ensure input box scales with input size
    let minWidth = '170px';
    if (inputBoxModel.value.length > 22) {
        minWidth = `${inputBoxModel.value.length * 7}px`;
    }
    inputBoxRef.value.style.width = minWidth;                        // expand input box based on how many characters are in the input
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
    <h1>Valid Brackets</h1>

    <h3>Instructions.</h3>

    <div class="input-container">
        <div>
            Enter a sequence of brackets  ( ) {} or []   if order is logical returns true ({[]})  
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel" @input="gotData"
            width="auto">
    </div>
    <div>
        Your sequence of brackets are logical : <span v-if="loading">Loading...</span> <span v-else>{{ answer }} </span>
    </div>

</template>
