import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import App from './App.vue'
import 'unfonts.css'

const app = createApp(App)

app.component('date-picker', Vue3PersianDatetimePicker)

registerPlugins(app)

app.mount('#app')
