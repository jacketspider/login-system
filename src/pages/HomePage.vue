<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { LogOut, User, Mail, Home, Shield } from 'lucide-vue-next'

const router = useRouter()
const { currentUser, isLoggedIn, logout, checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})

const handleLogout = () => {
  logout()
  router.push('/login')
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center">
                <Shield class="w-8 h-8 text-blue-600" />
                <span class="ml-2 text-xl font-bold text-gray-800">Login System</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <template v-if="isLoggedIn">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ currentUser?.username }}</p>
                  <p class="text-xs text-gray-500">{{ currentUser?.email }}</p>
                </div>
              </div>
              <button
                @click="handleLogout"
                class="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <LogOut class="w-4 h-4 mr-2" />
                退出登录
              </button>
            </template>

            <template v-else>
              <button
                @click="goToLogin"
                class="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                登录
              </button>
              <button
                @click="goToRegister"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                注册
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <Home class="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 class="text-4xl font-bold text-gray-800 mb-4">欢迎来到 Login System</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          这是一个基于 Vue3 + TypeScript + Tailwind CSS 构建的现代化登录注册系统
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <User class="w-7 h-7 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">用户注册</h3>
          <p class="text-gray-600">创建账户只需填写用户名、邮箱和密码，简单快捷</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <Shield class="w-7 h-7 text-green-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">安全登录</h3>
          <p class="text-gray-600">使用邮箱和密码安全登录，数据存储在本地浏览器</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <Mail class="w-7 h-7 text-purple-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">实时状态</h3>
          <p class="text-gray-600">登录状态实时同步，支持页面刷新后自动恢复</p>
        </div>
      </div>

      <div v-if="isLoggedIn" class="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-2">欢迎回来，{{ currentUser?.username }}！</h2>
            <p class="text-blue-100">您已成功登录系统</p>
          </div>
          <button
            @click="handleLogout"
            class="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
          >
            退出登录
          </button>
        </div>
      </div>

      <div v-else class="mt-12 bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center">
          <p class="text-gray-600 mb-6">您还没有登录，请先登录或注册账户</p>
          <div class="flex justify-center space-x-4">
            <button
              @click="goToLogin"
              class="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
            >
              去登录
            </button>
            <button
              @click="goToRegister"
              class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              去注册
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400">© 2026 Login System. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>