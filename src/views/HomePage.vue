<template>
  <div>
    <AppHeader active="dict" />
    <SearchBar />
    <AiAssist />

    <!-- upper -->
    <section class="bg-[url('/images/french-learning-illustration.png')] bg-no-repeat bg-center pt-[95px]">
      <div class="max-w-[1030px] mx-auto px-4">
        <ul class="font-deserta text-[56px] leading-[76px]">
          <li>YOUR ELEGANT</li>
          <li class="text-blue-700">COMPANION</li>
          <li>IN FRENCH LEARNING</li>
        </ul>
        <router-link to="/dict" class="font-deserta inline-block mt-[67px] w-[268px] h-[64px] bg-primary bg-blue-700 text-white text-2xl rounded-full text-center leading-[64px]">
          SEARCH NOW
        </router-link>

        <div class="mt-[139px]">
          <h3 class="text-[40px] font-deserta">INTRODUCTION</h3>
          <p class="font-inter mt-[59px] text-xl leading-8">
            本站致力于打造一款高质量、实用而优雅的法语词典工具，集词义查询、例句拓展、词根分析于一体，助力学习者深入理解每一个法语单词背后的文化与语境。不止查词，更是探索语言之美的旅程。
          </p>
          <p class="font-serif mt-4 text-xl leading-8 text-gray-500">
            A refined and practical French dictionary designed for learners and enthusiasts. Discover accurate definitions, contextual examples, and deep linguistic insights — because learning French is more than memorizing words, it's exploring a world of meaning.
          </p>
        </div>
      </div>
    </section>

    <!-- lower -->
    <section class="bg-[url('/images/lower.png')] bg-contain bg-no-repeat h-[437px] w-full">
      <div class="max-w-[1030px] mx-auto flex items-center justify-between h-full">
        <ul class="font-deserta text-[35px] leading-[53px]">
          <li>CUMULATIVE <span class="text-primary">WORD</span></li>
          <li>LOOKUP COUNT</li>
        </ul>

        <div>
          <p class="text-muted mb-3 text-lg">累计</p>
          <div class="flex items-end gap-2">
            <span v-for="i in 11" :key="i" class="w-[34px] h-[60px] rounded-[17px] bg-gradient-to-b from-white to-[#d5e2f8] border border-transparent flex items-center justify-center text-2xl text-muted shadow">
              0
            </span>
            <span class="font-deserta text-primary text-[35px] ml-2">TIMES</span>
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