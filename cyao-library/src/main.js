// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)
app.use(router)


app.mount('#app')
// Your web app's Firebase configuration