<script setup lang="js">
import { ref } from 'vue'

/**
 * { src: 'string' }
 */
const model = defineModel()

const srcInput = ref(model.value.src)
const fit = ref('contain')

function onChangeSrcInput() {
  model.value.src = srcInput.value
}
</script>

<template>
  <div>
    <div class="settings">
      <div style="padding-bottom: 8px;">設定</div>
      <el-input v-model="srcInput" placeholder="画像アドレス" @change="onChangeSrcInput" />
    </div>
    <div style="width:100%; height:auto;">
      <el-image :src="model.src" :fit="fit" />
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
