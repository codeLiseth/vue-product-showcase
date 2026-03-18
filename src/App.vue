<template>
  <v-app :theme="themeName">
    <Header />

    <v-main>
      <v-container fluid class="main-layout">
        <v-row>
          <v-col cols="12" md="8" lg="9">
            <ProductList />
          </v-col>

          <v-col cols="12" md="4" lg="3">
            <CartView />
          </v-col>
        </v-row>
      </v-container>

      <ProductDetailDialog />
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ProductList from './components/ProductList.vue'
import CartView from './components/CartView.vue'
import ProductDetailDialog from './components/ProductDetailDialog.vue'

const store = useStore()

const themeName = computed(() => {
  return store.state.darkMode ? 'dark' : 'light'
})
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-layout {
  padding-top: 24px;
  padding-bottom: 24px;
}
</style>