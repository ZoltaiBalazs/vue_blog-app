<template>
  <div>
    <h1 class="mb-4">Legújabb Blogbejegyzések</h1>
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-4">
        <div class="card mb-4">
          <img :src="post.image" class="card-img-top" alt="Post kép" />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.subtitle }}</p>
            <router-link :to="`/post/${post.id}`" class="btn btn-primary">Bővebben</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  subtitle: string
  image: string
}

const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts?_limit=6')
    posts.value = response.data
  } catch (error) {
    console.error('Hiba a bejegyzések lekérésekor:', error)
  }
})
</script>

<style>
.row {
  width: 600px;
}
</style>
