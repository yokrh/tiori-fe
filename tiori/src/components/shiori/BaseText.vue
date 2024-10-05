<script setup lang="js">
import { ref } from 'vue'

/**
 * { text: 'string' }
 */
const model = defineModel()

const textInput = ref(model.value.text)
const fit = ref('contain')

function onChangeText() {
  model.value.text = textInput.value
}
</script>

<template>
  <div>
    <div class="settings">
      <div style="padding-bottom: 8px;">設定</div>
      <el-input type="textarea" :autosize="{ minRows: 2}" v-model="textInput" placeholder="テキスト" @change="onChangeText" />
    </div>
    <div style="width:100%; height:auto;">
      <el-input
        v-model="model.text"
        :autosize="{ minRows: 2}"
        type="textarea"
        readonly
      />
      <div>{{  }}</div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  margin: 20px 0;
  padding: 8px 4%;
  background-color: #eee;
}
</style>
