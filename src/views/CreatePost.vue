<template>
  <div class="container mt-5">
    <h2>Új Post Létrehozása</h2>
    <form @submit.prevent="createPost">
      <div class="mb-3">
        <label for="title" class="form-label">Cím</label>
        <input type="text" id="title" v-model="post.title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="subtitle" class="form-label">Alcím</label>
        <input type="text" id="subtitle" v-model="post.subtitle" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="short_text" class="form-label">Rövid szöveg</label>
        <textarea
          id="short_text"
          v-model="post.short_text"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">Szöveg</label>
        <textarea
          id="content"
          v-model="post.content"
          class="form-control"
          rows="5"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Kép URL</label>
        <input type="text" id="image" v-model="post.image" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="category" class="form-label">Kategória</label>
        <select id="category" v-model="post.category" class="form-control" required>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Post létrehozása</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'CreatePost',
  setup() {
    const post = ref({
      title: '',
      subtitle: '',
      short_text: '',
      content: '',
      image: '',
      category: '',
    })

    const categories = ref<{ id: number; name: string }[]>([])

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories')
        categories.value = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const createPost = async () => {
      try {
        const response = await axios.post('http://localhost:3000/posts', post.value)
        console.log('Post created:', response.data)
        alert('Post sikeresen létrehozva!')
      } catch (error) {
        console.error('Error creating post:', error)
        alert('Hiba történt a post létrehozása során.')
      }
    }

    onMounted(fetchCategories)

    return {
      post,
      categories,
      createPost,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

button {
  width: 100%;
}
</style>
