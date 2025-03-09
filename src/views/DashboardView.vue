<template>
  <div>
    <h1 class="mb-4">Saját bejegyzéseim</h1>
    <router-link to="/create-post" class="btn btn-success mb-3">Új bejegyzés</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Cím</th>
          <th>Kategória</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.category }}</td>
          <td>
            <router-link :to="`/dashboard/edit/${post.id}`" class="btn btn-warning btn-sm"
              >Szerkesztés</router-link
            >
            <button @click="deletePost(post.id)" class="btn btn-danger btn-sm ms-2">Törlés</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  category: string
}

const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Hiba a bejegyzések lekérésekor:', error)
  }
})

const deletePost = async (id: number) => {
  if (confirm('Biztosan törölni szeretnéd ezt a bejegyzést?')) {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`)
      posts.value = posts.value.filter((post) => post.id !== id)
    } catch (error) {
      console.error('Hiba a bejegyzés törlésekor:', error)
    }
  }
}
</script>
