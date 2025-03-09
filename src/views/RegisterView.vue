<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-3">Regisztráció</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Név</label>
          <input type="text" id="name" v-model="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Jelszó</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Regisztráció</button>
      </form>
      <p class="mt-3 text-center">
        Már van fiókod? <router-link to="/login">Jelentkezz be</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    await axios.post('http://localhost:3000/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    router.push('/login')
  } catch (error) {
    console.error('Hiba a regisztráció során:', error)
  }
}
</script>
