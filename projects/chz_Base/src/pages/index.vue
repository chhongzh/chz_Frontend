<template>
  <Transition name="fade">
    <div class="scrollBackground" v-show="showOtherElementSecond">
      <Vue3Marquee v-for="i in backgroundTextLineCount" :key="i" class="marqueeText"
        :direction="i % 2 == 0 ? 'reverse' : 'normal'" :delay="i * 0.1 + 0.1">
        <p v-for="j in backgroundTexts[i - 1]" v-text="j" class="ml-12" />
      </Vue3Marquee>
    </div>
  </Transition>

  <v-sheet class="transparent">
    <v-sheet style="height: 100vh" class="transparent" :elevation="0">
      <v-card style="height: 100%; " class="transparent" :elevation="12">
        <v-card-text style="height: 100%;">
          <!-- 头像优先 -->
          <v-row justify="center" align="center" style="height: 70%;" class="transparent">
            <v-sheet class="avatar mb-6 transparent" @animationend="whenAnimationEnd">
              <v-img ondragstart="return false" rounded="circle" src="@/assets/Avatar Dark but Vuetify.jpg"></v-img>
            </v-sheet>
          </v-row>


          <v-row justify="center" style="height: 30%;">
            <v-col cols="12">
              <!-- 解释 -->
              <Transition name="fade">
                <v-row v-show="showOtherElementFirst" justify="center" align="center" class="mb-4">
                  <span class=" text-h4" style="font-family: 'Maler';">A boy who codes.</span>
                </v-row>
              </Transition>
            </v-col>

            <!-- 往下 -->
            <v-col cols="12">
              <Transition name="fade" class="mb-4">
                <v-row v-show="showOtherElementSecond" justify="center" align="center">
                  <v-btn variant="outlined" text="Chz Chat" @click="goToProject('https://chat.chhongzh.xyz:5777')" />
                </v-row>
              </Transition>
              <Transition name="fade">
                <v-row v-show="showOtherElementSecond" justify="center" align="center">
                  <v-btn variant="tonal" icon="mdi-chevron-down" @click="viewIntroduce" />
                </v-row>
              </Transition>

            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>

    <v-container>
      <v-sheet style="min-height: 100vh" class="transparent">
        <v-card class="h-100" :elevation="12">
          <v-card-text>
            <VCodeBlock :code="chhongzhCode" highlightjs style="font-size: 1.5rem;" lang="golang" :copyTab="false"
              :copyButton="false" :copyIcons="false" tabs @run="console.log('123')">
              <template #label>
                <p ref="introduceTitleRef" class="text-h4">我的自我介绍</p>
              </template>
            </VCodeBlock>
          </v-card-text>
        </v-card>
      </v-sheet>

      <!-- Footer -->
      <v-card class="mt-12">
        <v-card-text>
          <span class="text-h5">由 chhongzh 设计并开发.</span>
          <Text>
            Commit: <v-code>{{ abbreviatedSha }}</v-code><br />
            Message: <v-code>{{ commitMessage }}</v-code>
          </Text>
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import "@/styles/font.css"
import { VCodeBlock } from '@wdns/vue-code-block';
import chhongzhCode from '@/assets/chhongzh.go?raw'
import { Vue3Marquee } from 'vue3-marquee';
import backgroundText from '@/assets/Background Text'
import { getRandomElements } from '@/common/utils';
import {
  abbreviatedSha,
  commitMessage
}
  // @ts-ignore
  from '~build/info'

definePage({
  meta: {
    layout: 'HomePage'
  }
})

const backgroundTexts = ref([])
const backgroundTextLineCount = 5

const introduceTitleRef = ref(null)

const showOtherElementFirst = ref(false)
const showOtherElementSecond = ref(false)


const whenAnimationEnd = () => {
  showOtherElementFirst.value = true

  setTimeout(() => {
    showOtherElementSecond.value = true
  }, 300)
}

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
    backgroundTexts.value[i] = getRandomElements(getRandomElements(backgroundText, 15).concat('CHZ!').concat('WMZ!'), 17)
    console.log(backgroundTexts.value[i])
  }
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