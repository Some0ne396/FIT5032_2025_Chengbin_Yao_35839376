<template>
  <!-- 🗄️ W5. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W5. Login</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3" style="justify-content: center;">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>
          <div class="row mb-3" style="justify-content: center;">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
          <div v-if="errors.auth == 'Login sueccess!'" class="text-success">{{ errors.password }}</div>
          <div v-if="errors.auth == 'Wrong user name or password'" class="text-danger">{{ errors.password }}</div>
        </form>
         <button @click='test' class="btn btn-primary me-2">Test</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { isLoggedIn } from '../components/userState'
const testPassWord='admin'
const testUsername='admin'

const formData = ref({
  username: '',
  password: '',
})

const submittedCards = ref([])

const test =()=>{
    console.log(isLoggedIn.value)
}

const submitForm = () => {
    if (formData.value.password==testPassWord&&formData.value.username==testUsername){
        isLoggedIn.value=true
        errors.value.auth = 'Login sueccess!'
        clearForm()
    }
    else{
        isLoggedIn.value=false
        errors.value.auth = 'Wrong user name or password'
    }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  auth: null,
})
</script>