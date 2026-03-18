import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import store from './store'

createApp(App)
  .use(store)
  .use(vuetify)
  .mount('#app')