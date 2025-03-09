<template>
  <div>
    <h1 class="mb-4">{{ categoryName }} Kategória</h1>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Post {
  id: number
  title: string
  subtitle: string
  image: string
  category: string
}

const route = useRoute()
const posts = ref<Post[]>([])
const categoryName = computed(() => route.params.id as string)

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts?category=${categoryName.value}`)
    posts.value = response.data
  } catch (error) {
    console.error('Hiba a bejegyzések lekérésekor:', error)
  }
})
</script>
