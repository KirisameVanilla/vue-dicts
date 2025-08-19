<template>
  <div>
    <AppHeader />
    <SearchBar />
    <AiAssist />

    <!-- upper -->
    <section class="bg-[url('/images/french-learning-illustration.png')] bg-no-repeat bg-center pt-[95px]">
      <div class="mx-auto px-4 max-w-[1030px]">
        <ul class="font-deserta text-[56px] leading-[76px]">
          <li>YOUR ELEGANT</li>
          <li class="text-blue-700">COMPANION</li>
          <li>IN FRENCH LEARNING</li>
        </ul>
        <router-link to="/dict" class="inline-block bg-blue-700 bg-primary mt-[67px] rounded-full w-[268px] h-[64px] font-deserta text-white text-2xl text-center leading-[64px]">
          SEARCH NOW
        </router-link>

        <div class="mt-[139px]">
          <h3 class="font-deserta text-[40px]">INTRODUCTION</h3>
          <p class="mt-[59px] font-inter text-xl leading-8">
            本站致力于打造一款高质量、实用而优雅的法语词典工具，集词义查询、例句拓展、词根分析于一体，助力学习者深入理解每一个法语单词背后的文化与语境。不止查词，更是探索语言之美的旅程。
          </p>
          <p class="mt-4 font-serif text-gray-500 text-xl leading-8">
            A refined and practical French dictionary designed for learners and enthusiasts. Discover accurate definitions, contextual examples, and deep linguistic insights — because learning French is more than memorizing words, it's exploring a world of meaning.
          </p>
        </div>
      </div>
    </section>

    <!-- lower -->
    <section class="bg-[url('/images/lower.png')] bg-contain bg-no-repeat w-full h-[437px]">
      <div class="flex justify-between items-center mx-auto max-w-[1030px] h-full">
        <ul class="font-deserta text-[35px] leading-[53px]">
          <li>CUMULATIVE <span class="text-primary">WORD</span></li>
          <li>LOOKUP COUNT</li>
        </ul>

        <div>
          <p class="mb-3 text-muted text-lg">累计</p>
          <div class="flex items-end gap-2">
            <span v-for="i in 11" :key="i" class="flex justify-center items-center bg-gradient-to-b from-white to-[#d5e2f8] shadow border border-transparent rounded-[17px] w-[34px] h-[60px] text-muted text-2xl">
              0
            </span>
            <span class="ml-2 font-deserta text-[35px] text-primary">TIMES</span>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import SearchBar from '../components/SearchBar.vue'
import AiAssist  from '../components/AiAssist.vue'
import AppFooter from '../components/AppFooter.vue'
</script>