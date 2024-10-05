<script setup lang="js">
import { ref, onMounted, watch, computed } from 'vue'

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import BaseImage from './shiori/BaseImage.vue'
import BaseText from './shiori/BaseText.vue'

import { useUserStore } from '@/stores/user'
import Shiori from '@/model/Shiori.js'
import PageLayoutContainer from '@/model/PageLayoutContainer.js'
import PageLayout from '@/model/PageLayout.js'
import PageLayoutType from '@/model/PageLayoutType.js'
import BlockType from '@/model/BlockType.js'
const userStore = useUserStore()

const props = defineProps({
  shioriId: { type: String, default: null },
})

const shiori = ref()
const isEditorMode = ref(false)
const baseImageModel = ref({ src: 'https://pbs.twimg.com/profile_images/1786403614988337152/YSZfAX0q_400x400.jpg' })
const baseTextModel = ref({ text: 'あいうえお　旅行' })

onMounted(async () => {
  await reloadShiori()
})

watch(userStore, async() => {
  await reloadShiori()
})

async function reloadShiori() {
  console.log(userStore.user)
  console.log(props.shioriId)

  if (!userStore.user) return
  if (!props.shioriId) return

  const res = await bffClient.getShiori(userStore.user.uid, props.shioriId)
  shiori.value = new Shiori(res.shiori)
  console.log(shiori.value)
}

async function onClickAddPage() {
  const req = {
    shioriId: shiori.value.id,
    layout: new PageLayoutContainer({
      list: [
        new PageLayout({
          type: PageLayoutType.SIMPLE_100,
          blockIdList: [],
        }),
      ],
    }), // dev
  }
  await bffClient.createPage(userStore.user.uid, req)

  await reloadShiori()
}

async function onClickAddBlock(pageId, pageLayoutIndex) {
  // create a Block
  const req = {
    pageId: pageId,
    type: BlockType.TITLE,
    content: "{ { \"text\":\"tttt\", \"description\":\"dddd\" }",
  } // dev
  const res = await bffClient.createBlock(userStore.user.uid, req)

  // save the Block into layout
  const page = shiori.value.pageList.filter(p => p.id == pageId)[0]
  page.layout = new PageLayoutContainer({
    list: [
      new PageLayout({
        type: PageLayoutType.SIMPLE_100,
        blockIdList: [
          ...page.layout.list[pageLayoutIndex].blockIdList.slice(0, pageLayoutIndex),
          res.blockId,
          ...page.layout.list[pageLayoutIndex].blockIdList.slice(pageLayoutIndex)
        ],
      }),
    ],
  }), // dev
  await bffClient.updatePage(userStore.user.uid, page.id, page)

  await reloadShiori()
}

function onChangeBaseImage() {
  console.log('onChangeBaseImage', baseImageModel.value)
}
function onChangeBaseText() {
  console.log('onChangeBaseText', baseTextModel.value)
}
</script>

<template>
  <div :class="{ 'is-viewer-mode': !isEditorMode }">
    <div>Shiori</div>

    <div>
      <el-switch
        v-model="isEditorMode"
        style="--el-switch-on-color: #8ccdc0; --el-switch-off-color: #d0dddf"
        inline-prompt
        active-text="編集モード"
        inactive-text=""
      />
    </div>

    <div>
      <div>Components</div>
      <div>
        <BaseImage v-model="baseImageModel" @change="onChangeBaseImage" />
        <BaseText v-model="baseTextModel" @change="onChangeBaseText" />
      </div>
    </div>

    <div v-if="shiori">
      <div>{{ shiori.title }}</div>

      <br/>
      <div v-for="p in shiori.pageList" :key="p.id">
        <div>Page Layout: {{ p.layout }}</div>
        <div v-for="(pl, index) in p.layout.list" :key="index">
          <div>PageLayout Type: {{ pl.type }}</div>
          <div>PageLayout blockIdList: {{ pl.blockIdList }}</div>
          <br/>

          <div @click="onClickAddBlock(p.id, index)">add block</div>
        </div>

        <br/>
        <div v-for="b in p.blockList" :key="b.id">
          <div>Block Type: {{ b.type }}</div>
          <div>Block Content: {{ b.content }}</div>
        </div>
        <br/><br/>
      </div>

      <div @click="onClickAddPage">add page</div>
    </div>

    <div v-else>
      no shiori
    </div>
  </div>
</template>

<style scoped>
.is-viewer-mode :deep(.settings) {
  display: none;
}
</style>