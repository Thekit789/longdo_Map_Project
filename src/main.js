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

const longdoMapApiKey = import.meta.env.VITE_LONGDO_MAP_API_KEY // ดึง API Key จาก environment variable

app.use(LongdoMap, {
  load: {
    apiKey: longdoMapApiKey,
  },
})

app.mount('#app')
