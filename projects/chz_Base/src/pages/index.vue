<template>
  <div class="scrollBackground">
    <Transition name="fade" v-for="i in backgroundTextLineCount">
      <div v-if="showOthersElement[i + 1]">
        <Vue3Marquee class="marqueeText" :direction="i % 2 == 0 ? 'reverse' : 'normal'" :duration="5 + 5 * i">
          <p v-for="j in backgroundTexts[i - 1]" v-text="j" class="ml-12" />
        </Vue3Marquee>
      </div>
    </Transition>
  </div>

  <v-sheet class="transparent">
    <v-sheet style="height: 100vh" class="transparent" :elevation="0">
      <v-card style="height: 100%; " class="transparent" :elevation="12">
        <v-card-text style="height: 100%;">
          <!-- 头像优先 -->
          <v-row justify="center" align="center" style="height: 70%;" class="transparent">
            <v-sheet class="avatar mb-6 transparent" @animationend="startShowOthers">
              <v-img ondragstart="return false" rounded="circle" src="@/assets/Avatar Dark but Vuetify.jpg"></v-img>
            </v-sheet>
          </v-row>


          <v-row justify="center" style="height: 30%;">
            <v-col cols="12">
              <!-- 解释 -->
              <Transition name="fade">
                <v-row v-show="showOthersElement[0]" justify="center" align="center" class="mb-4">
                  <span class="text-h3" style="font-family: 'Maler';">A boy who codes.</span>
                </v-row>
              </Transition>
            </v-col>

            <!-- 往下 -->
            <v-col cols="12">
              <!-- 项目列表 -->
              <Transition name="fade" class="mb-4">
                <v-row v-show="showOthersElement[1]" justify="center" align="center">
                  <v-btn variant="outlined" text="Chz Chat" @click="goToProject('https://chat.chhongzh.xyz:5777')" />
                </v-row>
              </Transition>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>

    <v-container>
      <v-sheet class="transparent">
        <v-card class="h-100" :elevation="12">
          <v-card-text>
            <span class="text-h5">由 chhongzh 设计并开发.</span>
            <Text>
              Commit: <v-code>{{ abbreviatedSha }}</v-code><br />
              Message: <v-code>{{ commitMessage }}</v-code><br />
              Date: <v-code>{{ committerDate }}</v-code>
            </Text>
          </v-card-text>
          <!-- <v-card-text>
            <VCodeBlock :code="chhongzhCode" highlightjs style="font-size: 1.5rem;" lang="golang" :copyTab="false"
              :copyButton="false" :copyIcons="false" tabs>
              <template #label>
                <p ref="introduceTitleRef" class="text-h4">简介</p>
              </template>
</VCodeBlock>
</v-card-text> -->
        </v-card>
      </v-sheet>

      <!-- Footer -->
      <v-card class="mt-12">

      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import "@/styles/font.css"
// import { VCodeBlock } from '@wdns/vue-code-block';
// import chhongzhCode from '@/assets/chhongzh.go?raw'
import { Vue3Marquee } from 'vue3-marquee';
import backgroundText from '@/assets/Background Text'
import { getRandomElements } from '@/common/utils';
import {
  abbreviatedSha,
  commitMessage,
  committerDate
}
  // @ts-ignore
  from '~build/info'
import logger from '@/common/logger';

definePage({
  meta: {
    layout: 'HomePage'
  }
})

const backgroundTexts = ref([])
const backgroundTextLineCount = 5

const introduceTitleRef = ref(null)

const showOthersElement = ref(Array(2 + 5).fill(false))



const viewIntroduce = () => {
  introduceTitleRef.value?.scrollIntoView({
    behavior: 'smooth',
  })
}

const initBackgroundText = () => {
  // backgroudText 是一个数组

  backgroundTexts.value = Array(backgroundTextLineCount).fill([])

  for (let i = 0; i < backgroundTextLineCount; i++) {
    // 随机取出一些字符
    backgroundTexts.value[i] = getRandomElements(backgroundText, 13)
  }
}

const startShowOthers = () => {
  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      showOthersElement.value[i] = true
    }, i * 300)
  }
  setTimeout(() => {
    for (let i = 2; i < showOthersElement.value.length; i++) {
      setTimeout(() => {
        showOthersElement.value[i] = true
      }, i * 100)
    }
  }, 222)
  logger.info('Aniamtion Timer set done.')
}

const goToProject = (url: string) => {
  window.open(url, '_blank')
}


onMounted(() => {
  initBackgroundText()
})
</script>

<style lang="css" scoped>
.avatar {
  width: max(256px, 10vw);
  height: max(256px, 10vw);
  transform: scale(1.8);
  animation: avatarEntrance 0.8s ease-in-out forwards;
  animation-delay: 0.6s;
}

@keyframes avatarEntrance {
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollBackground {
  position: fixed;
  height: 100dvh;
  top: 0%;
  left: 0%;

  width: 100%;
}

.transparent {
  background-color: transparent !important;
}

.marqueeText {
  overflow: hidden;
  line-height: 1;
  height: 20%;
  font-size: 20vh;
  opacity: 0.1;
  rotate: -10deg;
}
</style>