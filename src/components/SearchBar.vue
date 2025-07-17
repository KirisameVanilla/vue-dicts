<template>
  <section class="bg-white h-[88px] flex justify-center items-center">
    <div class="relative w-[804px]">
      <span class="absolute left-0 top-1/2 -translate-y-1/2 bg-primary bg-blue-700 text-white rounded-full px-8 py-3 z-10">
        法 / 英
      </span>
      <input
          type="text"
          placeholder="请输入单词"
          class="w-full h-[56px] pl-[207px] pr-[70px] border-[5px] border-primary border-blue-700 rounded-full text-xl outline-none"
      />
      <button class="absolute right-0 top-1/2 -translate-y-1/2 w-[56px] h-[56px] bg-primary rounded-full bg-[url('/images/search.png')] bg-no-repeat bg-center bg-[length:60%]" />
    </div>
  </section>
</template>