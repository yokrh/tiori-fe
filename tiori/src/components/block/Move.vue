<script setup lang="js">
import { ref, onMounted } from 'vue';

import BaseText from './BaseText.vue';

/**
 * { leaveAt: 'string', arriveAt: 'string', moveBy: 'string', description: 'string' }
 */
const model = defineModel()

const leaveAtInput = ref({ text: model.value.leaveAt })
const arriveAtInput = ref({ text: model.value.arriveAt })
const moveByInput = ref({ text: model.value.moveBy })
const descriptionInput = ref({ text: model.value.description })

onMounted(() => {
  console.log('Move', model.value)
})

function onChangeLeaveAt() {
  model.value.leaveAt = leaveAtInput.value.text
}
function onChangeArriveAt() {
  model.value.arriveAt = arriveAtInput.value.text
}
function onChangeMoveBy() {
  model.value.moveBy = moveByInput.value.text
}
function onChangeDescription() {
  model.value.description = descriptionInput.value.text
}
</script>

<template>
  <div class="move">
    <div class="time-and-move">
      <BaseText v-model="leaveAtInput" @change="onChangeLeaveAt" class="leave-at" />
      <BaseText v-model="arriveAtInput" @change="onChangeArriveAt" class="arrive-at" />
      <div class="move-by">
        <BaseText v-model="moveByInput" @change="onChangeMoveBy" />
      </div>
    </div>
    <BaseText v-model="descriptionInput" @change="onChangeDescription" class="description" />
  </div>
</template>

<style scoped>
.move {
  display: flex;
  padding-bottom: 32px;

  & :deep(.conten) .el-textarea__inner {
    background-color: none;
    border: none;
    box-shadow: none;
    resize: none;
  }
}
.time-and-move {
  width: 30%;
  display: flex;
  flex-direction: column;

  & .leave-at {
    order: 1;
    & :deep(.el-textarea__inner) {
      font-size: 16px;
    }
  }

  & .arrive-at {
    order: 3;
    & :deep(.el-textarea__inner) {
      font-size: 16px;
    }
  }

  & .move-by {
    order: 2;
    width: 80%;
    margin-left: 5%;
    padding: 16px 0 32px 8px;
    border-left: 2px solid #333;

    & :deep(.settings) {
      height: auto;
    }
  }
}
.description {
  margin-left: 2%;
  width: 68%;

  & :deep(.content) {
    height: 100%;
  }

  & :deep(.el-textarea__inner) {
    font-size: 24px;
  }
}
</style>
