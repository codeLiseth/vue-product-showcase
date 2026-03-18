import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    categories: [],
    selectedCategory: 'Todas',
    favorites: [],
    cart: [],
    selectedProduct: null,
    darkMode: false,
    loading: false,
    error: false
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_SELECTED_CATEGORY(state, category) {
      state.selectedCategory = category
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, value) {
      state.error = value
    },
    TOGGLE_FAVORITE(state, product) {
      const exists = state.favorites.find(item => item.id === product.id)

      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== product.id)
      } else {
        state.favorites.push(product)
      }
    },
    ADD_TO_CART(state, product) {
      const item = state.cart.find(item => item.id === product.id)

      if (item) {
        item.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product
    },
    CLEAR_SELECTED_PRODUCT(state) {
      state.selectedProduct = null
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', false)

      try {
        const productsResponse = await axios.get('https://fakestoreapi.com/products')
        const categoriesResponse = await axios.get('https://fakestoreapi.com/products/categories')

        commit('SET_PRODUCTS', productsResponse.data)
        commit('SET_CATEGORIES', categoriesResponse.data)
      } catch (error) {
        commit('SET_ERROR', true)
        console.error('Error al cargar productos:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    categoryOptions(state) {
      return ['Todas', ...state.categories]
    },

    filteredProducts(state) {
      if (state.selectedCategory === 'Todas') {
        return state.products
      }

      return state.products.filter(
        product => product.category === state.selectedCategory
      )
    },

    favoriteCount(state) {
      return state.favorites.length
    },

    isFavorite: (state) => (productId) => {
      return state.favorites.some(item => item.id === productId)
    },

    cartCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },

    isInCart: (state) => (productId) => {
      return state.cart.some(item => item.id === productId)
    },

    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  }
})