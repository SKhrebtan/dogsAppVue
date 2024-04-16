import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Paginate from 'vuejs-paginate-next'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Paginate', Paginate)
app.use(createPinia())
app.use(router)

app.mount('#app')
