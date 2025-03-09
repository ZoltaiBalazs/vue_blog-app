<template>
  <div>
    <div v-if="post" class="card mb-4 shadow-sm">
      <img :src="post.image" class="card-img-top" alt="Post kép" />
      <div class="card-body">
        <h1 class="card-title">{{ post.title }}</h1>
        <h5 class="text-muted">{{ post.subtitle }}</h5>
        <p class="mt-3">{{ post.content }}</p>
        <router-link :to="`/category/${post.category}`" class="btn btn-secondary mt-3">
          Vissza a kategóriához
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Bejegyzés betöltése...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  name: 'PostView',
  setup() {
    const route = useRoute()
    const post = ref({
      title: '',
      subtitle: '',
      short_text: '',
      content: '',
      image: '',
      category: '',
    })

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`)
        post.value = response.data
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    onMounted(fetchPost)

    return { post }
  },
})
</script>

<style scoped>
.card {
  max-width: 800px;
  width: 300px; /* Fix szélesség a kártyáknak, hogy ne legyenek túl vékonyak */
  margin: 20px auto; /* Középre igazítjuk a kártyát */
  padding: 20px; /* Belső margó hozzáadása a kártyákhoz */
}

.card-img-top {
  height: auto;
  max-height: 400px; /* Maximális magasság a képeknek, hogy ne nyújtsák túl */
  object-fit: cover; /* A kép megfelelően jelenjen meg a kártyán */
}

.card-body {
  padding: 20px; /* Több padding a szövegnek, hogy kényelmesen elférjen */
}

.card-title {
  font-size: 2rem; /* Nagyobb betűméret a címekhez */
  margin-bottom: 15px; /* Távolság a cím és a többi tartalom között */
}

.card-text {
  font-size: 1.1rem; /* A szövegek olvashatóságának növelése */
}

.btn {
  padding: 10px 20px; /* Több hely a gomb körül */
}

@media (max-width: 768px) {
  .card {
    max-width: 100%; /* Mobil eszközökhöz a kártyák szélességét 100%-ra állítjuk */
    padding: 10px; /* Kisebb padding mobilon */
  }

  .card-title {
    font-size: 1.5rem; /* Cím kisebb mobil eszközökön */
  }

  .card-body {
    padding: 15px;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Post {
  id: number
  title: string
  subtitle: string
  content: string
  image: string
  category: string
}

const route = useRoute()
const post = ref<Post | null>(null)

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`)
    post.value = response.data
  } catch (error) {
    console.error('Hiba a bejegyzés lekérésekor:', error)
  }
})
</script>
