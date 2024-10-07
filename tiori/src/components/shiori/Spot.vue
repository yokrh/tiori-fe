<script setup lang="js">
import { ref, onMounted } from 'vue';

import BaseImage from './BaseImage.vue';
import BaseText from './BaseText.vue';

/**
 * { title: 'string', image: 'string', description: 'string' }
 */
const model = defineModel()

const titleInput = ref({ text: model.value.title })
const imageInput = ref({ src: model.value.image })
const descriptionInput = ref({ text: model.value.description })

onMounted(() => {
  console.log('Spot', model.value)
})

function onChangeTitle() {
  model.value.title = titleInput.value.text
}
function onChangeImage() {
  model.value.image = imageInput.value.src
}
function onChangeDescription() {
  model.value.description = descriptionInput.value.text
}
</script>

<template>
  <div class="spot">
    <div class="title-and-image">
      <BaseText v-model="titleInput" @change="onChangeTitle" class="title" />
      <BaseImage v-model="imageInput" @change="onChangeImage" class="image" />
    </div>
    <BaseText v-model="descriptionInput" @change="onChangeDescription" class="description" />
  </div>
</template>

<style scoped>
.spot {
  display: flex;
  padding: 8px 2%;
}
.title-and-image {
  width: 40%;
}
.title {
  margin-bottom: 12px;
}
.image {
  width: 100%;
}
.description {
  margin-left: 2%;
  width: 58%;

  & >>> .content {
    height: 100%;
  }
}
</style>
