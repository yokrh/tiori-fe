<script setup lang="js">
import { ref, onMounted, watch, computed } from 'vue'

import BffClient from '../client/BffClient.js'
const bffClient = new BffClient()

import Block from './Block.vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import BlockType from '@/model/BlockType.js' // used in template
import Shiori from '@/model/Shiori.js'
import PageLayoutContainer from '@/model/PageLayoutContainer.js'
import PageLayout from '@/model/PageLayout.js'
import PageLayoutType from '@/model/PageLayoutType.js'
import BlockDefaultContent from '@/model/BlockDefaultContent.js';

const props = defineProps({
  shioriId: { type: String, default: null },
})

const shiori = ref()
const isEditorMode = ref(false)
const isAddBlockDialogEnabled = ref(false)
const pageLayoutType = PageLayoutType.SIMPLE_100;

onMounted(async () => {
  if (!userStore.user) return
  await reloadShiori()
})

watch(userStore, async() => {
  await reloadShiori()
})

async function reloadShiori() {
  console.log(`userStore.user: ${userStore.user}`)
  console.log(`props.shioriId: ${props.shioriId}`)

  if (!userStore.user) return
  if (!props.shioriId) return

  const res = await bffClient.getShiori(userStore.user.uid, props.shioriId)
  if (!res) return

  shiori.value = new Shiori(res.shiori)
  console.log(shiori.value)
}

async function onClickAddPage() {
  const req = {
    shioriId: shiori.value.id,
    layout: new PageLayoutContainer({
      list: [
        new PageLayout({
          type: pageLayoutType,
          blockIdList: [],
        }),
      ],
    })
  }
  await bffClient.createPage(userStore.user.uid, req)

  await reloadShiori()
}

async function onClickAddBlock(pageId, pageLayoutIndex, blockType) {
  // create a Block
  const req = {
    pageId: pageId,
    type: blockType,
    content: JSON.stringify(BlockDefaultContent[blockType]),
  }
  const res = await bffClient.createBlock(userStore.user.uid, req)

  // save the Block into layout
  const page = shiori.value.pageList.filter(p => p.id == pageId)[0]
  page.layout = new PageLayoutContainer({
    list: [
      new PageLayout({
        type: pageLayoutType,
        blockIdList: [
          ...page.layout.list[pageLayoutIndex].blockIdList.slice(pageLayoutIndex),
          res.blockId,
          ...page.layout.list[pageLayoutIndex].blockIdList.slice(0, pageLayoutIndex),
        ],
      }),
    ],
  }),
  await bffClient.updatePage(userStore.user.uid, page.id, page)

  await reloadShiori()
  isAddBlockDialogEnabled.value = false
}
</script>

<template>
  <div class="shiori" :class="{ 'is-viewer-mode': !isEditorMode }">
    <div v-if="userStore.user && shiori">
      <div class="title">{{ shiori.title }}</div>

      <div class="settings-switch">
        <el-switch
          v-model="isEditorMode"
          style="--el-switch-on-color: #7cbdb0; --el-switch-off-color: #d0dddf;"
          size="large"
          inline-prompt
          active-text="編集ON"
          inactive-text="編集OFF"
        />
      </div>

      <div class="page" v-for="p in shiori.pageList" :key="p.id">
        <div class="block-list" v-for="(pl, index) in p.layout.list" :key="index">
          <div class="block-container" v-for="bid in pl.blockIdList" :key="bid">
            <Block
              v-if="p.blockList.filter(b => b.id === bid).length > 0"
              v-model="p.blockList.filter(b => b.id === bid)[0]"
              @onChangeBlock="reloadShiori"
            />
          </div>

          <el-button
            class="create-block" 
            type="primary"
            @click="isAddBlockDialogEnabled = true">
            情報を追加する
          </el-button>

          <el-dialog v-model="isAddBlockDialogEnabled" title="どれを追加しますか？">
            <el-button
              class="block-select-button"
              type="success" plain
              @click="onClickAddBlock(p.id, index, BlockType.SPOT)">
              スポットを追加
            </el-button>
            <el-button
              class="block-select-button"
              type="warning" plain
              @click="onClickAddBlock(p.id, index, BlockType.MOVE)">
              移動を追加
            </el-button>
          </el-dialog>
        </div>
      </div>

      <el-button
        class="create-page" 
        type="primary" plain
        @click="onClickAddPage">
        ページを追加する
      </el-button>

      <div v-for="p in shiori.pageList" :key="p.id" style="background: #ddd; padding: 12px 24px; margin: 12px;">
        <div>DEBUG</div>
        <div>Page: {{ p }}</div>
      </div>
    </div>

    <div v-else>
      しおりが見つかりませんでした
    </div>
  </div>
</template>

<style scoped>
.is-viewer-mode :deep(.settings) {
  display: none;
}

.shiori {
  padding: 12px 4%;

  & .title {
    font-size: 32px;
  }

  & .settings-switch {
    margin-bottom: 32px;

    & :deep(.el-switch__core) {
      padding: 4px;
    }

    & :deep(.el-switch__inner) .is-text {
      font-weight: bold;
    }
  }

  & .block-select-button {
    margin-left: 0 !important;
    display: block;

    & + .block-select-button {
      margin-top: 8px !important;
    }
  }

  & .create-page {
    margin: 32px 0;
  }
}
</style>