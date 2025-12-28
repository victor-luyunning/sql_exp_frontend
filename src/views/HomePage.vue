<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white">
    <div class="layout-container flex w-full flex-col">
      <!-- Header -->
      <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111a22] px-10 py-3 shadow-sm">
        <div class="flex items-center gap-4 text-text-main dark:text-white cursor-pointer" @click="router.push('/')">
          <div class="size-8 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[32px]">menu_book</span>
          </div>
          <h2 class="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Campus Books</h2>
        </div>
        <div class="flex flex-1 justify-end gap-8">
          <!-- 登录后显示 -->
          <div v-if="isLoggedIn" class="hidden md:flex items-center gap-9">
            <router-link to="/" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">首页</router-link>
            <router-link to="/search" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">搜索教材</router-link>
            <router-link to="/cart" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors flex items-center gap-1">
              <span class="material-symbols-outlined text-[20px]">shopping_cart</span>
              购物车
            </router-link>
            <router-link to="/profile" class="text-text-main dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">个人中心</router-link>
          </div>
          <!-- 登录后：头像 + 退出 -->
          <div v-if="isLoggedIn" class="flex items-center gap-4 relative">
            <!-- 头像下拉菜单 -->
            <div class="relative">
              <div class="relative">
                <div 
                  class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover cursor-pointer border-2" 
                  :style="`background-image: url('${authStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCViKVOfHqt2-9UnYUpEzs287y79wFyt5RgXZoljAsZiXY1Yv6Ek-JedzvHPJdmnvPaDQe6xgkvDKfWJHAcfPSGQrRelaSox-PHSs0Nw6IHc50RANilEH_OBiupphEPR5sK43w8MznzWnnkXMRoOg77t61Aw0TR_VfYZgRPlsim9N9UWKAW1KgC9Bdq644UXAxAEUgFcFrPmz35qhR5jbyKyb11O8RrueWZmCT7fpDh2HLrhusLNEZrm4hrS8jwyQEb7bIRcBNaenJw'}');`"
                  @click="toggleDropdown"
                ></div>
                <div class="absolute bottom-0 right-0 bg-green-500 rounded-full p-0.5 border border-white">
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>
              
              <!-- 下拉菜单 -->
              <div 
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-4 px-6"
              >
                <!-- 关闭按钮 -->
                <button 
                  @click="showDropdown = false"
                  class="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <span class="material-symbols-outlined text-[20px]">close</span>
                </button>

                <!-- 用户信息 -->
                <div class="flex flex-col items-center gap-4 pt-2">
                  <!-- 头像 -->
                  <div 
                    class="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover border-2 relative" 
                    :style="isLoggedIn ? `background-image: url('${authStore.userInfo?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCViKVOfHqt2-9UnYUpEzs287y79wFyt5RgXZoljAsZiXY1Yv6Ek-JedzvHPJdmnvPaDQe6xgkvDKfWJHAcfPSGQrRelaSox-PHSs0Nw6IHc50RANilEH_OBiupphEPR5sK43w8MznzWnnkXMRoOg77t61Aw0TR_VfYZgRPlsim9N9UWKAW1KgC9Bdq644UXAxAEUgFcFrPmz35qhR5jbyKyb11O8RrueWZmCT7fpDh2HLrhusLNEZrm4hrS8jwyQEb7bIRcBNaenJw'}');` : 'background-image: url(https://ui-avatars.com/api/?name=请登录&background=0D8ABC&color=fff);'"
                  >
                    <div v-if="isLoggedIn" class="absolute bottom-0 right-0 bg-green-500 rounded-full p-0.5 border-2 border-white">
                      <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <!-- 用户名 -->
                  <div class="text-center">
                    <p class="text-lg font-bold text-slate-900 dark:text-white">{{ isLoggedIn ? userInfo.username : '请登录' }}</p>
                  </div>
                  
                  <!-- 邮箱 -->
                  <div class="text-center w-full" v-if="isLoggedIn">
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ userInfo.email || '暂无邮箱信息' }}</p>
                  </div>
                  <div class="text-center w-full" v-else>
                    <p class="text-sm text-slate-600 dark:text-slate-400">尚未登录</p>
                  </div>

                  <!-- 操作按钮 -->
                  <div class="w-full flex flex-col gap-2 mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button 
                      v-if="isLoggedIn"
                      @click="goToProfile"
                      class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[18px]">person</span>
                      个人中心
                    </button>
                    <button 
                      v-if="!isLoggedIn"
                      @click="goToLogin"
                      class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[18px]">login</span>
                      登录
                    </button>
                    <button 
                      v-if="isLoggedIn"
                      @click="handleLogout"
                      class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <span class="material-symbols-outlined text-[18px]">logout</span>
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 未登录：注册 + 登录 -->
          <div v-else class="flex gap-2">
            <router-link to="/register" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all">
              <span class="truncate">注册</span>
            </router-link>
            <router-link to="/login" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-text-main dark:text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all">
              <span class="truncate">登录</span>
            </router-link>
          </div>
        </div>
      </header>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center">
      <!-- Hero Section -->
      <section class="w-full bg-white dark:bg-[#111a22] py-5 px-4 md:px-10 lg:px-40 flex justify-center border-b border-slate-100 dark:border-slate-800">
        <div class="layout-content-container flex flex-col max-w-[1280px] flex-1">
          <div class="@container">
            <div class="flex flex-col-reverse gap-6 py-10 @[480px]:gap-8 @[864px]:flex-row items-center">
              <div class="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center flex-1">
                <div class="flex flex-col gap-3 text-left">
                  <h1 class="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                    欢迎来到校园二手教材交易平台
                  </h1>
                  <h2 class="text-text-muted dark:text-slate-400 text-lg font-normal leading-normal">
                    为你的下个学期省钱。安全、轻松地与同学们买卖二手书籍。
                  </h2>
                </div>
                <label class="flex flex-col h-14 w-full max-w-[520px] shadow-sm rounded-lg">
                  <div class="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#dbe0e6] dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary overflow-hidden">
                    <div class="text-text-muted dark:text-slate-400 flex bg-[#f0f2f4] dark:bg-slate-800 items-center justify-center pl-4 border-r-0">
                      <span class="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input 
                      v-model="searchKeyword"
                      @keyup.enter="handleSearch"
                      class="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-main dark:text-white focus:outline-0 bg-[#f0f2f4] dark:bg-slate-800 h-full placeholder:text-text-muted dark:placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                      placeholder="搜索 ISBN、书名或作者"
                    />
                    <div class="flex items-center justify-center bg-[#f0f2f4] dark:bg-slate-800 pr-2">
                      <button @click="handleSearch" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal transition-colors">
                        <span class="truncate">搜索</span>
                      </button>
                    </div>
                  </div>
                </label>
                <div class="flex gap-4 pt-2 flex-wrap">
                  <span class="text-sm font-medium text-slate-500">热门搜索:</span>
                  <a @click="searchByKeyword('微积分')" class="text-sm text-primary hover:underline cursor-pointer">微积分</a>
                  <a @click="searchByKeyword('生物学')" class="text-sm text-primary hover:underline cursor-pointer">生物学</a>
                  <a @click="searchByKeyword('化学')" class="text-sm text-primary hover:underline cursor-pointer">化学</a>
                  <a @click="searchByKeyword('心理学')" class="text-sm text-primary hover:underline cursor-pointer">心理学</a>
                </div>
              </div>
              <div class="w-full @[864px]:w-1/2 flex justify-center @[864px]:justify-end">
                <div class="w-full max-w-[500px] aspect-video bg-center bg-no-repeat bg-cover rounded-xl shadow-md overflow-hidden" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4fBSAGdmu5ojgQhuC41jxpMa3Gc5QJrnJUoMZHA-_2PHXLscuQ0EfumlroxQtO-muyp1fot8U123dOQYNTXuxh5eV4tyLlEOat2-7_BN8VgoNklKq2z7UmjcKJaxCxEGqT_O1v6tvBzyiLwKRJVgEY3-B4nNdHWOKr8DN-MIbqlKjxvsqs9ja7up4E9a6zvwOOFJnDKkIsfiguHgorPhbCuhcQsylOrpZEGnEGoYEXw3c_OAwNwWWRWiqQk66vMMT-Ov6f5xcX4G9");'>
                  <div class="w-full h-full bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="w-full bg-background-light dark:bg-background-dark py-10 px-4 md:px-10 lg:px-40 flex justify-center">
        <div class="layout-content-container flex flex-col max-w-[1280px] flex-1">
          <div class="flex flex-col gap-10 py-10">
            <div class="flex flex-col gap-4 text-center items-center">
              <h2 class="text-text-main dark:text-white tracking-tight text-[32px] font-bold leading-tight max-w-[720px]">
                平台运作方式
              </h2>
              <p class="text-text-muted dark:text-slate-400 text-base font-normal leading-normal max-w-[720px]">
                简单的步骤,轻松获取你需要的书籍或出售闲置教材。
              </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div class="flex flex-1 gap-4 rounded-xl border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-[#1e293b] p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div class="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">upload_file</span>
                </div>
                <div class="flex flex-col gap-2">
                  <h3 class="text-text-main dark:text-white text-lg font-bold leading-tight">发布教材</h3>
                  <p class="text-text-muted dark:text-slate-400 text-sm font-normal leading-relaxed">几秒钟内创建列表。上传照片,输入ISBN,设定价格,开始销售。</p>
                </div>
              </div>
              <div class="flex flex-1 gap-4 rounded-xl border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-[#1e293b] p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div class="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">search</span>
                </div>
                <div class="flex flex-col gap-2">
                  <h3 class="text-text-main dark:text-white text-lg font-bold leading-tight">寻找优惠</h3>
                  <p class="text-text-muted dark:text-slate-400 text-sm font-normal leading-relaxed">专门搜索课程所需的教材。按成色和价格筛选。</p>
                </div>
              </div>
              <div class="flex flex-1 gap-4 rounded-xl border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-[#1e293b] p-6 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div class="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">location_on</span>
                </div>
                <div class="flex flex-col gap-2">
                  <h3 class="text-text-main dark:text-white text-lg font-bold leading-tight">校园面交</h3>
                  <p class="text-text-muted dark:text-slate-400 text-sm font-normal leading-relaxed">免去运费。在校园内安排安全的见面地点交换书籍。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Books -->
      <section class="w-full bg-white dark:bg-[#111a22] px-4 md:px-10 lg:px-40 flex justify-center pt-8">
        <div class="layout-content-container flex flex-col max-w-[1280px] flex-1">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="text-text-main dark:text-white text-[24px] font-bold leading-tight tracking-tight">最新发布</h2>
            <router-link to="/search" class="text-primary font-medium text-sm flex items-center hover:underline">
              查看全部 <span class="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </section>
      
      <section class="w-full bg-white dark:bg-[#111a22] px-4 md:px-10 lg:px-40 flex justify-center pb-12">
        <div class="layout-content-container flex flex-col max-w-[1280px] flex-1">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            <!-- Book Card 1 -->
            <div @click="goToBook(1)" class="flex flex-col gap-3 group cursor-pointer">
              <div class="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqciNAB5C-fOkKsuRYhnMfnMSEBjaUo43HZwlgCy5NHyfYhVvY7jcmLZfcYYhuZo08z4hasDHDR3GD2ywDJyp82SU6SZeKoBCRkD4Q4szE1uRmGU5oxpEXTz7O8W1X0iEh22G22AZscVzVJQ2ZRbwaPej2eBeWSzfCD49JCXoA5o1crKPtBE78iog4UPcCdPY9eUp211QbFICPV_fV2Bx9sRoZgp34Szmx57s0SIwXc6LeDRpOIpdlUO5Tq1CV1Xibv4b6HnZkNa1n");'>
                </div>
                <div class="absolute top-2 right-2 bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-text-main dark:text-white shadow-sm">
                  二手
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-text-main dark:text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">微积分：早期超越函数 (Calculus)</h3>
                <p class="text-text-muted dark:text-slate-400 text-sm font-normal">James Stewart</p>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-primary text-lg font-bold">¥45.00</p>
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Book Card 2 -->
            <div @click="goToBook(2)" class="flex flex-col gap-3 group cursor-pointer">
              <div class="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxlKwFU0b2VwIHqzD3mdEgxfxYhDNLcaB-dq4DYMH86FpGA1-O03gZzoB85DPQALwCS8nEDbafPQAwOqqT11jiZU96uLIYsMuvySDN5EoPrCLQOPqVL8iqIIjVdG5O1ZKkOz-SFHAFroX7bboiu1ccvY35fJLENUQZ1wRNe5Yex7g4HpP1U3QLcS7qLTv-RpP_95gfe8ZnMUI6SkxVMo6antsVxFmlkZO_Pd994O7TTP8k1UlOvwjzhcYiLPeqGOgG83wNYtxBRN37");'>
                </div>
                <div class="absolute top-2 right-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  九成新
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-text-main dark:text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">坎贝尔生物学 (Campbell Biology)</h3>
                <p class="text-text-muted dark:text-slate-400 text-sm font-normal">Lisa A. Urry</p>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-primary text-lg font-bold">¥60.00</p>
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Book Card 3 -->
            <div @click="goToBook(3)" class="flex flex-col gap-3 group cursor-pointer">
              <div class="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBxG8Oe_5vjqxUaMFnva3kVwXqLUPCL9BHE7qQAIVvfcxc_nITOh3RaMEGj4Z6dF0ri7EmX8i2AQsvXRiArEyy6w6otQ0jrT7wqGRmDuEdCDXoeaFDVJ69lLLHMlDzCF-84hgwLnsb4L3bFE7zYko8AkvMey46nudnZvOWCr8_Uj_pWjHOtL6HN2Dxh6ZHhHPdFVGj3o9DRbds91WtMxJ8KMaW2IDy3KF1VoiN0xHBhNx0JQfzptuoLIz96YrylRbHI7Iynw0FdkDP");'>
                </div>
                <div class="absolute top-2 right-2 bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-text-main dark:text-white shadow-sm">
                  良好
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-text-main dark:text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">经济学原理 (Principles of Economics)</h3>
                <p class="text-text-muted dark:text-slate-400 text-sm font-normal">N. Gregory Mankiw</p>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-primary text-lg font-bold">¥30.00</p>
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Book Card 4 -->
            <div @click="goToBook(4)" class="flex flex-col gap-3 group cursor-pointer">
              <div class="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfHUrKiEvwNOHSoLvt6lMYh9FbDq_08PStcBqt5KTpgQJt4YtlEuAODaHs9UI4QqHT8MYVok1szX_1v7fYCqMHOXhiiOHQYKxGzHAAkvI42U77kxb-PWbBVKBN6IBZYu-2CkzVsDqVxlfwuMON68vzvHm-vMGgsT6RbNGZNKOhR9zTypRDp4JOC54lbQnZW9JMwfReJlbpbguuIykkcmr3WLfABwhIsOkBbY_tdDalNJGQNZsWnWXalLLM7jWIRjX_HkaFK42ASApX");'>
                </div>
                <div class="absolute top-2 right-2 bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  一般
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-text-main dark:text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">美国人民的历史 (People's History)</h3>
                <p class="text-text-muted dark:text-slate-400 text-sm font-normal">Howard Zinn</p>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-primary text-lg font-bold">¥20.00</p>
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">favorite</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center mt-6">
            <router-link to="/search" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-text-main dark:text-white text-sm font-bold leading-normal transition-all">
              浏览所有分类
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-[#111a22] border-t border-slate-200 dark:border-slate-800 py-10 px-10 flex justify-center">
      <div class="max-w-[1280px] w-full flex flex-col md:flex-row justify-between gap-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <div class="size-6 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <span class="text-lg font-bold text-text-main dark:text-white">Campus Books</span>
          </div>
          <p class="text-slate-500 text-sm max-w-xs">学生在校园内购买、出售和交换教材的最安全、最简单的方式。</p>
        </div>
        <div class="flex gap-12 flex-wrap">
          <div class="flex flex-col gap-3">
            <h4 class="font-bold text-text-main dark:text-white text-sm uppercase tracking-wide">平台</h4>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">浏览书籍</a>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">出售书籍</a>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">我的账户</a>
          </div>
          <div class="flex flex-col gap-3">
            <h4 class="font-bold text-text-main dark:text-white text-sm uppercase tracking-wide">支持</h4>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">帮助中心</a>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">安全提示</a>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">联系我们</a>
          </div>
          <div class="flex flex-col gap-3">
            <h4 class="font-bold text-text-main dark:text-white text-sm uppercase tracking-wide">法律</h4>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">服务条款</a>
            <a class="text-slate-500 hover:text-primary text-sm" href="#">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const searchKeyword = ref('')
const showDropdown = ref(false)
// 检查登录状态
const isLoggedIn = computed(() => {
  return authStore.isLoggedIn
})

const userInfo = computed(() => {
  return authStore.userInfo || {
    username: '',
    email: ''
  }
})

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 跳转到个人中心
const goToProfile = () => {
  showDropdown.value = false
  router.push('/profile')
}

// 退出登录
const handleLogout = async () => {
  showDropdown.value = false
  await authStore.logout()
  router.push('/login')
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown && showDropdown.value) {
    showDropdown.value = false
  }
}

// 在组件挂载时尝试获取用户信息
const initializeAuth = async () => {
  if (authStore.token && !authStore.userInfo) {
    try {
      await authStore.fetchUserInfo()
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  // 初始化认证状态
  await initializeAuth()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/search', query: { keyword: searchKeyword.value } })
  } else {
    router.push('/search')
  }
}

const searchByKeyword = (keyword) => {
  searchKeyword.value = keyword
  handleSearch()
}

const goToBook = (id) => {
  router.push(`/book/${id}`)
}
</script>
