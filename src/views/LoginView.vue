<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-3">Bejelentkezés</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Jelszó</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Bejelentkezés</button>
      </form>
      <p class="mt-3 text-center">
        Még nincs fiókod? <router-link to="/register">Regisztrálj itt</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard')
  } catch (error) {
    console.error('Hibás bejelentkezés:', error)
  }
}
</script>
