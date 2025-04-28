<script setup>

import { defineModel } from '@vue/composition-api';
import { ref } from 'vue';

const loading = ref(false);
const inputBoxRef = ref(null);

const inputBoxModel = defineModel();

const bigCandles = ref();





const gotData = (data) =>{


    console.log("got input:",inputBoxModel.value)
    
    //bigCandles = birthdayCakeCandles(array)                                                 // invoke logic to determine answer

    bigCandles.value =  domainName(inputBoxModel.value);

                                                                                                // ensure input box scales with input size
    console.log("chars in input is ", inputBoxModel.value.length)
    let minWidth = '170px';
    if(inputBoxModel.value.length  > 22){
        minWidth = `${inputBoxModel.value.length*7}px`;
    } 
    

    inputBoxRef.value.style.width = minWidth ;                        // expand input box based on how many characters are in the input
    console.log("width is ", inputBoxRef.value.style.width, inputBoxModel.value.length);
}


function domainName(url){
    //your code here
    console.log( "in function, got url: ", {url})
    let arr = url.split('.');
    
    console.log({arr})
    if (arr.length>1){
      if( arr[0] == "www" || arr[0]=='http://www' || arr[0] == 'https://www') {
        //console.log("found ", arr[1])
        return arr[1];
     }
    let websiteSlash =  arr[0].split('//')
    //console.log({websiteSlash}, arr[0])
    if (websiteSlash[0] == 'www' || websiteSlash[0] == 'http:' || websiteSlash[0] == 
       'https:' ) return websiteSlash[1];
    else return websiteSlash[0];
    
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
    <h1>Extract domain from URL</h1>
    
    <h3>Instructions.</h3>
    <p> Enter URL and the domain name will be extracted and printed in space allocated.</p>
    <div class="input-container">
        <div>
            Enter the URL:
        </div>
        <input ref="inputBoxRef" type="text" id="candles" name="candles" v-model="inputBoxModel" @input="gotData" width="auto" >
    </div>
    <div>
    The domain name is: <span v-if="loading">Loading...</span> <span v-else>{{ bigCandles }} </span>
    </div>

</template>

