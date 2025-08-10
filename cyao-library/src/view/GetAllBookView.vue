<template>
    <div v-if="apiResponse" class="api-response">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const book = ref([])
const totalBooks = ref(0)

const calculateStats = () => {
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)
for (const author of authors.value) {
  for (const work of author.famousWorks) {
    book.value.push(work);
  }
}
}


const getApiData = async () => {
    loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    calculateStats()
    
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  };

  apiResponse.value = {
    success: true,
    data: {
      totalBooks: totalBooks.value,
      books: book.value.map(book => ({
        title: book.title,
        year: book.year,
      }))
    },
    timestamp: new Date().toISOString()
  }
}

onMounted(() => {
  getApiData();
})

defineExpose({
  getApiData
})
</script>