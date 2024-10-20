<script setup lang="js">
import { ref, onMounted } from 'vue';

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import Spot from './block/Spot.vue'
import Move from './block/Move.vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import BlockType from '@/model/BlockType.js'

/**
 * @/model/Block.js
 */
const model = defineModel()

const blockId = model.value.id
const blockType = model.value.type
const blockContent = ref(JSON.parse(model.value.content))

const emit = defineEmits(['onChangeBlock'])

async function onChangeBlock() {
  await bffClient.updateBlock(
    userStore.user.uid,
    blockId,
    { type: blockType, content: JSON.stringify(blockContent.value) }
  )

  emit('onChangeBlock')
}
</script>

<template>
  <div class="block">
    <template v-if="blockType == BlockType.SPOT">
      <Spot v-model="blockContent" @change="onChangeBlock" />
    </template>

    <template v-else-if="blockType == BlockType.MOVE">
      <Move v-model="blockContent" @change="onChangeBlock" />
    </template>

    <template v-else>
      <div>不明ブロック</div>
    </template>
  </div>
</template>

<style scoped>
.block {
  background-color: #eee;
}
</style>