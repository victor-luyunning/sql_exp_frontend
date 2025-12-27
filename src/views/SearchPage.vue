<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-200">
    <!-- Header -->
    <AppHeader />

    <!-- Search Bar Section -->
    <div class="bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 pt-8 pb-8 px-4 md:px-8">
      <div class="max-w-[960px] mx-auto flex flex-col gap-6">
        <div class="text-center">
          <h1 class="text-3xl md:text-4xl font-black tracking-tight text-text-main dark:text-white mb-2">
            寻找你下学期的教材
          </h1>
          <p class="text-text-muted dark:text-gray-400">
            支持按 教材名称、作者、ISBN 或 课程名 搜索
          </p>
        </div>
        <div class="relative w-full max-w-2xl mx-auto">
          <div class="flex w-full items-center rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-600 overflow-hidden h-14 focus-within:ring-2 ring-primary transition-all">
            <div class="pl-4 pr-2 text-text-muted dark:text-gray-400">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              class="w-full h-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-slate-400 text-base" 
              placeholder="试试搜索 '高等数学' 或 '978-0134093413'..."
            />
            <button @click="handleSearch" class="m-1 h-10 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm transition-colors">
              搜索
            </button>
          </div>
        </div>
        <div class="flex justify-center flex-wrap gap-2 md:gap-3">
          <span class="text-sm font-medium text-text-muted dark:text-gray-400 py-1">快速筛选:</span>
          <button @click="setSearchType('title')" :class="[searchType === 'title' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">教材名称</button>
          <button @click="setSearchType('author')" :class="[searchType === 'author' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">作者</button>
          <button @click="setSearchType('isbn')" :class="[searchType === 'isbn' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">ISBN</button>
          <button @click="setSearchType('course')" :class="[searchType === 'course' ? 'bg-primary/20 text-primary border-primary' : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary', 'px-3 py-1 rounded-full text-sm font-medium text-text-main dark:text-gray-200 transition-colors border border-slate-200 dark:border-slate-600']">课程名</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 max-w-[1280px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar Filters -->
      <aside class="lg:col-span-3 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-text-main dark:text-white">筛选条件</h2>
          <button @click="resetFilters" class="text-sm font-medium text-primary hover:text-primary-dark">重置</button>
        </div>
        <div class="flex flex-col gap-3">
          <!-- 成色筛选 -->
          <details class="group rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden" open>
            <summary class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors select-none">
              <span class="font-bold text-text-main dark:text-white text-sm">成色</span>
              <span class="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180 text-lg">expand_more</span>
            </summary>
            <div class="px-4 pb-4 pt-1 space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="LIKE_NEW" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">全新 / 九九新</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="GOOD" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">良好</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.conditions" value="FAIR" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">一般</span>
              </label>
            </div>
          </details>

          <!-- 院系筛选 -->
          <details class="group rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors select-none">
              <span class="font-bold text-text-main dark:text-white text-sm">院系/专业</span>
              <span class="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180 text-lg">expand_more</span>
            </summary>
            <div class="px-4 pb-4 pt-1 space-y-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.departments" value="数学系" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">数学系</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.departments" value="计算机科学" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">计算机科学</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input v-model="filters.departments" value="历史系" class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 bg-white dark:bg-slate-800 dark:border-slate-600" type="checkbox"/>
                <span class="text-sm text-text-main dark:text-gray-300">历史系</span>
              </label>
            </div>
          </details>

          <!-- 价格范围 -->
          <details class="group rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 overflow-hidden" open>
            <summary class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors select-none">
              <span class="font-bold text-text-main dark:text-white text-sm">价格范围</span>
              <span class="material-symbols-outlined text-text-muted transition-transform group-open:rotate-180 text-lg">expand_more</span>
            </summary>
            <div class="px-4 pb-4 pt-1">
              <input v-model="filters.maxPrice" class="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary" max="200" min="0" type="range"/>
              <div class="flex justify-between mt-2 text-xs text-text-muted dark:text-gray-400 font-medium">
                <span>¥0</span>
                <span>¥{{ filters.maxPrice }}+</span>
              </div>
            </div>
          </details>
        </div>
      </aside>

      <!-- Results Section -->
      <section class="lg:col-span-9 flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-700">
          <p class="text-text-muted dark:text-gray-400 text-sm">找到 <span class="font-bold text-text-main dark:text-white">{{ totalResults }}</span> 个关于 "{{ displayKeyword }}" 的结果</p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-text-muted dark:text-gray-400 hidden sm:inline">排序方式:</span>
            <div class="relative group">
              <select v-model="sortBy" class="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-text-main dark:text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-primary focus:border-primary cursor-pointer">
                <option value="relevance">相关度</option>
                <option value="price_asc">价格: 从低到高</option>
                <option value="price_desc">价格: 从高到低</option>
                <option value="latest">最新发布</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-main dark:text-white">
                <span class="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Book List -->
        <div class="flex flex-col gap-4">
          <!-- Book Card 1 -->
          <article @click="goToBook(1)" class="group flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer">
            <div class="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center p-4">
              <img alt="Book cover" class="h-full w-auto object-contain shadow-md rounded-sm transform group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLZN-kyOvw06CnxgknUDOnzaRu0UJLQqXQds94RiUI4pn6anBiMGHrcBbsxs9zfO51ip4pKQB-YiLZWsfwr-CAJ0H-_5dsyjsjZ6nRV1MdT07c9oEJ4owrk4TODCY2Jd9GC-qri_qOXU09bW6DQSD4ogf_bpZD7hrPv55Xcprzli-_SDZ_WpGsUYHMBMns1vymLdCdHoO2wKfPnmCYVcS5tveWD0akeg3kEVAFWFiXXS3ewikBOAoYCWEvb221w7wVjRp5bMFP_V2N"/>
            </div>
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="space-y-2">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">MATH 101</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">精装版</span>
                  </div>
                  <h3 class="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Calculus: Early Transcendentals</h3>
                  <div class="text-sm text-text-muted dark:text-gray-400">
                    <p>作者 <span class="font-medium text-text-main dark:text-gray-200">James Stewart</span> • 第8版</p>
                    <p class="font-mono text-xs mt-1">ISBN: 978-1285741550</p>
                  </div>
                  <div class="flex gap-2 pt-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800">
                      <span class="material-symbols-outlined text-[14px]">check_circle</span> 成色: 良好
                    </span>
                  </div>
                </div>
                <div class="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 text-right">
                  <div>
                    <p class="text-2xl font-black text-primary">¥45.00</p>
                    <p class="text-xs text-text-muted dark:text-gray-500 line-through">新书估价 ¥120.00</p>
                  </div>
                  <button class="hidden md:flex h-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm px-4 hover:bg-primary hover:text-white transition-all">
                    查看详情
                  </button>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCM9g-4_NL7OUTkYmFCOFgw9RE0sfqBnmP7z_kmXtj1pJ_MzjSqhtUZ_ZGIl177gHMWJWY0GdnoXdMbZvQcfpTuFJ6MacYD9c8O4h2tpZXJx8jqrbMQq_xkm0q6Y8zK-TPFsFQRruYxuoWnmeX6iLfIeMcT52En_HDcVPsi4poPEBg4_yNLKWJkqc4n8f71MFPKa8aQPA_x_qXz2bkc4DFpdcL_vygWh_wFDOu7BmOVEzzDSVNC-w8f1ACPHKdF0sBLjMkEJcxfNxVq");'></div>
                  <div class="text-sm">
                    <p class="font-medium text-text-main dark:text-white leading-none">Alex M.</p>
                    <div class="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400 mt-1">
                      <span class="material-symbols-outlined text-yellow-400 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span>4.8 (12)</span>
                    </div>
                  </div>
                </div>
                <button class="md:hidden h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm px-4 shadow-sm">
                  查看详情
                </button>
              </div>
            </div>
          </article>

          <!-- Book Card 2 -->
          <article @click="goToBook(2)" class="group flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer">
            <div class="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center p-4">
              <img alt="Book cover" class="h-full w-auto object-contain shadow-md rounded-sm transform group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhzlW_wmuoivdbxSN0fqxtUz99DIDWKDl_ganKtCUk3NQodwagrcxntA2u5vzGVO0m_uBJ3xLSpCEHDE-HSdQYTscBt9CkBB5KsFBWNCj1D6ZN1y8LdZqmJBHJ_S6biMKzeXvNjOdml71nqYQoKv5aCexnkwbfL9R77fW3_wOug6CArEirU6L55BDkaGj7uQ2GO_vBuwWHv2w5NcL02MqIdCZhzavYR3W-GbeCiexcqAl1YOEZ2cfGoYc2kjGiCAxV_Ot3Q15iIkHn"/>
            </div>
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="space-y-2">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">MATH 201</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">平装版</span>
                  </div>
                  <h3 class="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Essential Calculus: Early Transcendentals</h3>
                  <div class="text-sm text-text-muted dark:text-gray-400">
                    <p>作者 <span class="font-medium text-text-main dark:text-gray-200">James Stewart</span> • 第2版</p>
                    <p class="font-mono text-xs mt-1">ISBN: 978-1133112280</p>
                  </div>
                  <div class="flex gap-2 pt-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium border border-yellow-200 dark:border-yellow-800">
                      <span class="material-symbols-outlined text-[14px]">info</span> 成色: 一般
                    </span>
                  </div>
                </div>
                <div class="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 text-right">
                  <div>
                    <p class="text-2xl font-black text-primary">¥25.00</p>
                    <p class="text-xs text-text-muted dark:text-gray-500 line-through">新书估价 ¥95.00</p>
                  </div>
                  <button class="hidden md:flex h-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm px-4 hover:bg-primary hover:text-white transition-all">
                    查看详情
                  </button>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgr9G4ukC4t_8oZjcYB2yTn0y_O4bkMsQ-AUapFbuWaFJF6FQGAEZ5bP8neilxynR2rGbi3FZS3rq668F0601YYyut6mvOBJJaRuSF3KWN2Iy_3ON6SqvR8mAYU4rdTwCja15N3xPKEzw0tfvkJ5gHv-KWu4wMjf7zcbskJsp5dbIy0OYLna5zFrlJa9qko6EbA2VmsSwdy3awAaTZuziKTXYaWHcjNX-SUW_qjvcMmDI2mA1xbNcLBrV_48-2CkY05HBMKhqoJHdO");'></div>
                  <div class="text-sm">
                    <p class="font-medium text-text-main dark:text-white leading-none">Sarah J.</p>
                    <div class="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400 mt-1">
                      <span class="material-symbols-outlined text-yellow-400 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span>5.0 (3)</span>
                    </div>
                  </div>
                </div>
                <button class="md:hidden h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm px-4 shadow-sm">
                  查看详情
                </button>
              </div>
            </div>
          </article>

          <!-- Book Card 3 -->
          <article @click="goToBook(3)" class="group flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer">
            <div class="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center p-4">
              <img alt="Book cover" class="h-full w-auto object-contain shadow-md rounded-sm transform group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJNKsrx7qNdBwEW-hmil7VUeupXYoD0NIzquL7kyfj2J2DDN0daT0F_NBDmDhy_spPfmxd7z1q6OLRaznVqJMuJyh78H-FLIWm007qy92gBROKH_lK9WIqWFZkF4-aqC4sZd3UnwwZGb_dWtBCPfDjZpOzNHGkvvxyG9Kh7D5tm1jhZHzA0Hr9deu5JThE5Hjz5IpGnI1-HLxAJuLM94lQ9H_j03jABNZQApGUHZRL_cgh2txwhb6Ysoay0WWwuGxGKnhnUXOKmwEP"/>
            </div>
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="space-y-2">
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">CS 220</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">精装版</span>
                  </div>
                  <h3 class="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">Linear Algebra and Its Applications</h3>
                  <div class="text-sm text-text-muted dark:text-gray-400">
                    <p>作者 <span class="font-medium text-text-main dark:text-gray-200">David C. Lay</span> • 第5版</p>
                    <p class="font-mono text-xs mt-1">ISBN: 978-0321982384</p>
                  </div>
                  <div class="flex gap-2 pt-2">
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-800">
                      <span class="material-symbols-outlined text-[14px]">auto_awesome</span> 成色: 九九新
                    </span>
                  </div>
                </div>
                <div class="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 text-right">
                  <div>
                    <p class="text-2xl font-black text-primary">¥60.00</p>
                    <p class="text-xs text-text-muted dark:text-gray-500 line-through">新书估价 ¥150.00</p>
                  </div>
                  <button class="hidden md:flex h-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm px-4 hover:bg-primary hover:text-white transition-all">
                    查看详情
                  </button>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600 bg-center bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCCkVwlNk-DbkOB7b3vUH2qEpMcWAwwxgrxLWloxO2UoHzJcYhMyPWH29HYenwXiGE7To5T4yRApweB0BZgfSmP9evM3NXFz8bDdhK5Pik7PDWHCioZopjXQXzCaVHBcfjsufuSnMg0ralqedkuPMbqPrJ7ehPrTQ_KLhFOnInx885khtFsoWywDjVgmRY64yilryAsUsAliQ0z3pqVc602A_4qt5pwM66i9CFvp7erDMZLdrrUdVK2bW0EurLX362VzdURUbvvxCg");'></div>
                  <div class="text-sm">
                    <p class="font-medium text-text-main dark:text-white leading-none">Emily W.</p>
                    <div class="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400 mt-1">
                      <span class="material-symbols-outlined text-yellow-400 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span>4.5 (8)</span>
                    </div>
                  </div>
                </div>
                <button class="md:hidden h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm px-4 shadow-sm">
                  查看详情
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2 pt-8">
          <button class="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-muted hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="flex items-center justify-center size-10 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/30">1</button>
          <button class="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">2</button>
          <button class="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">3</button>
          <span class="text-text-muted px-2">...</span>
          <button class="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-main dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">12</button>
          <button class="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-text-muted hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 py-8 mt-auto">
      <div class="max-w-[1280px] mx-auto px-4 md:px-8 text-center text-text-muted dark:text-gray-500 text-sm">
        <p>© 2023 CampusBooks. 校园二手书交易平台,始于2015。</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const searchType = ref('title')
const sortBy = ref('relevance')
const totalResults = ref(124)

const filters = ref({
  conditions: ['GOOD'],
  departments: [],
  maxPrice: 200
})

const displayKeyword = computed(() => {
  return searchQuery.value || route.query.keyword || '微积分'
})

onMounted(() => {
  if (route.query.keyword) {
    searchQuery.value = route.query.keyword
  } else {
    searchQuery.value = '微积分'
  }
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { keyword: searchQuery.value } })
  }
}

const setSearchType = (type) => {
  searchType.value = type
}

const resetFilters = () => {
  filters.value = {
    conditions: [],
    departments: [],
    maxPrice: 200
  }
}

const goToBook = (id) => {
  router.push(`/book/${id}`)
}
</script>
