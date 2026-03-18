<template>
  <v-card class="product-card" elevation="3">
    <v-img
      :src="product.image"
      height="180"
      cover
    ></v-img>

    <v-card-title class="card-title">
      {{ product.title }}
    </v-card-title>

    <v-card-text>
      <p class="price">${{ product.price }}</p>
      <p class="category">{{ product.category }}</p>
    </v-card-text>

    <v-card-actions class="actions">
      <v-btn
        color="secondary"
        variant="tonal"
        block
        @click="viewDetails"
      >
        Ver detalles
      </v-btn>

      <v-btn
        :color="inCart ? 'success' : 'primary'"
        :variant="inCart ? 'outlined' : 'flat'"
        block
        @click="addToCart"
      >
        {{ inCart ? '✔ Agregado al carrito' : 'Agregar al carrito' }}
      </v-btn>

      <v-btn
        :color="favorite ? 'pink' : 'grey'"
        variant="outlined"
        block
        @click="toggleFavorite"
      >
        {{ favorite ? 'Quitar favorito' : 'Favorito' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const store = useStore()

const favorite = computed(() => {
  return store.getters.isFavorite(props.product.id)
})

const inCart = computed(() => {
  return store.getters.isInCart(props.product.id)
})

const toggleFavorite = () => {
  store.commit('TOGGLE_FAVORITE', props.product)
}

const addToCart = () => {
  store.commit('ADD_TO_CART', props.product)
}

const viewDetails = () => {
  store.commit('SET_SELECTED_PRODUCT', props.product)
}
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 16px;
  line-height: 1.3;
  min-height: 60px;
  white-space: normal;
}

.price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.category {
  color: #555;
  text-transform: capitalize;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
}
</style>