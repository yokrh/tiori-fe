<script setup lang="js">
import { ref, onMounted } from 'vue'

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
  <div class="base-image">
    <div class="settings">
      <el-input v-model="srcInput" placeholder="画像アドレス" @change="onChangeSrcInput" />
    </div>
    <div class="content">
      <el-image :src="model.src" :fit="fit" />
    </div>
  </div>
</template>

<style scoped>
.base-image {
  position: relative;

  & :deep(.el-input) {
    height: 100%;
    padding: 2%;
  }

  & :deep(.el-image) {
    padding: 2%;
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
  height: auto;
}
</style>
