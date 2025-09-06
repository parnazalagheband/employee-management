import router from '@/router'
import pinia from '@/stores'
import vuetify from './vuetify'
import toastPlugin from './toast' // پلاگین toast واقعی

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(toastPlugin) // ✅ اینجا درست است
}
