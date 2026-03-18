<template>
  <header class="header">
    <h1>Everything Store</h1>

    <p class="subtitle">
      🛒 Carrito: {{ cartCount }} | ❤️ Favoritos: {{ favoriteCount }}
    </p>

    <v-btn
      class="theme-btn"
      color="white"
      variant="outlined"
      @click="toggleTheme"
    >
      {{ darkMode ? 'Modo claro' : 'Modo oscuro' }}
    </v-btn>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const favoriteCount = computed(() => store.getters.favoriteCount)
const cartCount = computed(() => store.getters.cartCount)
const darkMode = computed(() => store.state.darkMode)

const toggleTheme = () => {
  store.commit('TOGGLE_DARK_MODE')
}
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #4facfe, #00c6ff);
  color: white;
  text-align: center;
  padding: 20px;
}

.subtitle {
  margin-top: 8px;
  font-size: 16px;
}

.theme-btn {
  margin-top: 12px;
}
</style>