<template>
  <v-dialog
    :model-value="dialogOpen"
    max-width="700"
    @update:model-value="closeDialog"
  >
    <v-card v-if="selectedProduct">
      <v-card-title class="text-h6">
        {{ selectedProduct.title }}
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="5">
            <v-img
              :src="selectedProduct.image"
              height="250"
              contain
            ></v-img>
          </v-col>

          <v-col cols="12" md="7">
            <p><strong>Categoría:</strong> {{ selectedProduct.category }}</p>
            <p><strong>Precio:</strong> ${{ selectedProduct.price }}</p>
            <p><strong>Descripción:</strong></p>
            <p>{{ selectedProduct.description }}</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="closeDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const selectedProduct = computed(() => store.state.selectedProduct)
const dialogOpen = computed(() => !!store.state.selectedProduct)

const closeDialog = () => {
  store.commit('CLEAR_SELECTED_PRODUCT')
}
</script>