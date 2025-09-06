import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  install(app) {
    app.config.globalProperties.$toast = toast
    app.component('ToastContainer', () => import('vue3-toastify').then(m => m.ToastContainer))
  }
}

export { toast }