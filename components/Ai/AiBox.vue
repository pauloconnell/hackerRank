<script setup >
import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';
import deepai from 'deepai';


const loading = ref(false);
const inputBoxRef = ref(null);
const aiButton = ref(null);
const showAiButton = ref(false);
const inputBoxModel = defineModel();
const AiWisdom = ref('');

const askAi = async () =>{
    const config = useRuntimeConfig();

    //const apiKey = process.env.DEEP_AI_KEY;
    //deepai.setApiKey(apiKey);               //Got API key by registering @  https://deepai.org
  //NOT on client side  console.log(config.DEEP_AI_KEY); // This should log your API key

      // first try:
    //try {
        // var resp = await deepai.callStandardApi("text-generator", {
        //     text: `${inputBoxModel.value}`,
        // });
        // console.log("Ai has responed with: ",resp);
        // AiWisdom.value = resp;

        // take 2:
    //     const response = await fetch('https://api.deepai.org/api/text-generator', {
    //         method: 'POST',
    //         headers: {
    //             'Api-Key': config.DEEP_AI_KEY,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             text: `${inputBoxModel.value}`
    //         })
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     AiWisdom.value = data;
    // } catch (error) {
    //     console.error("Error calling DeepAI API:", error);
    // }

    // moving request to server side to hide api key

    try {
        console.log("send request ", inputBoxModel.value, JSON.stringify(inputBoxModel.value))

        const data = await $fetch('/api/deep-ai', {
            method: 'POST',
            body: JSON.stringify(inputBoxModel.value)
        });
        console.log("Ai response is :", data)
        AiWisdom.value = data;

    } catch (error) {
        console.error(error)
    }




}




const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    

    if(!inputBoxModel.value) return;
    showAiButton.value = true;                                                               // Activate button                                                              
     
    let string = inputBoxModel.value; //.split(" ").map(Number);                                     // convert string input into array of numbers
    console.log("sending question", {string})



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
    <h1>Ai Box</h1>
    
    <h3>Please only 1 question - OpenAi has daily limit for me.</h3>
    
    <div class="input-container">
        <div>
            Enter your Question:
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel" @input="gotData" width="auto" >
        <button ref="aiButton" @click="askAi" v-show="showAiButton">Ask Ai</button>
    </div>
    <div>
    Total number of ... is: <span v-if="loading">Loading...</span> <span v-else>{{ AiWisdom }} </span>
    </div>

</template>