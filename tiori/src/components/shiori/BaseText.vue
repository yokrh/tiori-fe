<script setup lang="js">
import { ref, onMounted } from 'vue'

/**
 * { text: 'string' }
 */
const model = defineModel()

const textInput = ref(model.value.text)

onMounted(() => {
  console.log('BaseText', model.value)
})

function onChangeText() {
  model.value.text = textInput.value
}
</script>

<template>
  <div class="base-text">
    <div class="settings">
      <el-input type="textarea" :autosize="{ minRows: 2}" v-model="textInput" placeholder="テキスト" @change="onChangeText" />
    </div>
    <div class="content">
      <el-input
        v-model="model.text"
        :autosize="{ minRows: 2}"
        type="textarea"
        readonly
      />
    </div>
  </div>
</template>

<style scoped>
.base-text {
  position: relative;

  & :deep(.el-textarea) {
    height: 100%;
    padding: 2%;
  }
  & :deep(.el-textarea__inner) {
    height: 100% !important;
  }
}
.settings {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
.content {
  width: 100%;
}
</style>
