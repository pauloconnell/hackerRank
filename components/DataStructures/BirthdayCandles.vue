<script setup>
import { defineModel } from '@vue/composition-api';
const candleBox = defineModel();
const gotData = (data) =>{


    console.log("got input:",candleBox.value)
}
</script>

<template>
    <div>
    
    <input type="text" id="candles" name="candles" v-model="candleBox" @input="gotData" >
</div>
</template>