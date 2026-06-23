import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  email: string
}

const currentUser = ref<User | null>(null)
const isLoggedIn = computed(() => currentUser.value !== null)

const users: Record<string, { password: string; user: User }> = {}

export function useAuth() {
  const register = (username: string, email: string, password: string): boolean => {
    if (users[email]) {
      return false
    }
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
    }
    users[email] = { password, user }
    return true
  }

  const login = (email: string, password: string): boolean => {
    const stored = users[email]
    if (stored && stored.password === password) {
      currentUser.value = stored.user
      localStorage.setItem('user', JSON.stringify(stored.user))
      return true
    }
    return false
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
    }
  }

  return {
    currentUser,
    isLoggedIn,
    register,
    login,
    logout,
    checkAuth,
  }
}