<template>
  <v-card elevation="3" class="cart-panel">
    <v-card-title class="text-h5">
      🛒 Carrito
    </v-card-title>

    <v-card-text v-if="cart.length === 0">
      Tu carrito está vacío.
    </v-card-text>

    <template v-else>
      <v-list>
        <v-list-item
          v-for="item in cart"
          :key="item.id"
          class="cart-item"
        >
          <template #prepend>
            <v-avatar rounded size="56">
              <v-img :src="item.image"></v-img>
            </v-avatar>
          </template>

          <v-list-item-title class="item-title">
            {{ item.title }}
          </v-list-item-title>

          <v-list-item-subtitle>
            Cantidad: {{ item.quantity }}
          </v-list-item-subtitle>

          <v-list-item-subtitle>
            ${{ item.price }}
          </v-list-item-subtitle>

          <template #append>
            <v-btn
              color="error"
              variant="text"
              size="small"
              @click="removeFromCart(item.id)"
            >
              Eliminar
            </v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-text class="summary">
        <p><strong>Productos:</strong> {{ cartCount }}</p>
        <p><strong>Total:</strong> ${{ cartTotal.toFixed(2) }}</p>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          color="error"
          variant="flat"
          block
          @click="clearCart"
        >
          Vaciar carrito
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const cart = computed(() => store.state.cart)
const cartCount = computed(() => store.getters.cartCount)
const cartTotal = computed(() => store.getters.cartTotal)

const removeFromCart = (productId) => {
  store.commit('REMOVE_FROM_CART', productId)
}

const clearCart = () => {
  store.commit('CLEAR_CART')
}
</script>

<style scoped>
.cart-panel {
  position: sticky;
  top: 24px;
}

.cart-item {
  padding-top: 12px;
  padding-bottom: 12px;
}

.item-title {
  white-space: normal;
  line-height: 1.3;
  font-size: 14px;
}

.summary p {
  margin: 6px 0;
}
</style>