import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LongdoMap from 'longdo-map-vue'

const app = createApp(App)

// 1. ติดตั้ง Pinia
// Pinia เป็น state management library สำหรับ Vue 3
app.use(createPinia())

// 2. ติดตั้ง Vue Router
// Vue Router ใช้สำหรับการจัดการ routing ในแอปพลิเคชัน Vue
app.use(router)

// 3. ติดตั้ง LongdoMap plugin
// LongdoMap เป็น plugin สำหรับการใช้งานแผนที่ Longdo ใน Vue
app.use(LongdoMap, {
  load: {
    apiKey: 'b3be4e0b99f8806a4f60860e2cac50c0',
  },
})

app.mount('#app')
