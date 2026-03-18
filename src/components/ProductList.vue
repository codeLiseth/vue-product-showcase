<template>
  <v-container class="py-6">
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-select
          :model-value="selectedCategory"
          @update:model-value="updateCategory"
          :items="categoryOptions"
          label="Filtrar por categoría"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <p>Cargando productos...</p>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12">
        <p>Error al cargar productos.</p>
      </v-col>
    </v-row>

    <v-row v-else-if="filteredProducts.length === 0">
      <v-col cols="12">
        <p>No hay productos para mostrar.</p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from './ProductCard.vue'

const store = useStore()

const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const selectedCategory = computed(() => store.state.selectedCategory)
const categoryOptions = computed(() => store.getters.categoryOptions)
const filteredProducts = computed(() => store.getters.filteredProducts)

const updateCategory = (value) => {
  store.commit('SET_SELECTED_CATEGORY', value)
}

onMounted(() => {
  store.dispatch('fetchProducts')
})
</script>