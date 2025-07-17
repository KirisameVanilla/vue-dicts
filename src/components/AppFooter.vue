<template>
  <footer class="bg-gradient-to-t from-[#005ae0] to-transparent h-[570px] flex justify-center items-start">
    <div class="max-w-[1030px] mx-auto flex space-x-[190px] pt-[195px]">
      <div v-for="col in columns" :key="col.title">
        <h3 class="text-primary font-bold mb-8">{{ col.title }}</h3>
        <ul class="space-y-2">
          <li v-for="link in col.links" :key="link">
            <a href="#" class="text-[16px] text-[#666] opacity-45 hover:opacity-100">{{ link }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
const columns = [
  { title: '关于我们', links: ['团队介绍','发展计划','联系我们'] },
  { title: '问题解决', links: ['客服','帮助','常见问题'] },
  { title: '快速入口', links: ['查词','翻译','写作指导'] },
]
</script>