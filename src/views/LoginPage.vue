<template>
  <div>
    <header class="bg-white h-[174px] flex items-center">
      <div class="max-w-[1030px] mx-auto">
        <router-link to="/" class="block w-[237px] h-[61px] bg-[url('/images/LOGO.png')] bg-contain bg-no-repeat pl-[100px] leading-[31px] font-deserta text-2xl">
          CiDian
        </router-link>
      </div>
    </header>

    <main class="relative overflow-visible">
      <div class="max-w-[1030px] mx-auto pt-10">
        <ul class="flex flex-col items-end font-deserta text-5xl leading-[76px]">
          <li class="font-inter text-lg text-muted">BONJOUR</li>
          <li class="text-primary">WELCOME BACK</li>
          <li>LET'S GET STARTED</li>
        </ul>

        <form class="mt-[77px] max-w-[401px]">
          <label class="block mb-6 text-muted text-xl">手机号</label>
          <input type="text" class="w-full h-[63px] border border-primary rounded-full px-8 text-2xl outline-none" />

          <label class="block mt-8 mb-6 text-muted text-xl">密码</label>
          <input type="password" class="w-full h-[63px] border border-primary rounded-full px-8 text-2xl outline-none" />

          <button type="submit" class="mt-[72px] w-[268px] h-[63px] bg-primary text-white text-2xl rounded-full">
            LOG IN
          </button>
        </form>
      </div>

      <!-- 背景图（伪元素） -->
      <div class="absolute top-4 -right-[200px] w-[1200px] h-[800px] bg-[url('/images/8ba41f...png')] bg-no-repeat bg-auto bg-[position:-100px_0] -z-10" />
    </main>

    <footer class="h-[465px] bg-gradient-to-t from-[#4284e8] to-transparent" />
  </div>
</template>