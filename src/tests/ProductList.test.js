import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import ProductList from '../components/ProductList.vue'

describe('ProductList', () => {
  it('muestra mensaje de error', () => {
    const store = createStore({
      state: {
        loading: false,
        error: true,
        selectedCategory: 'Todas'
      },
      getters: {
        categoryOptions: () => ['Todas'],
        filteredProducts: () => []
      },
      actions: {
        fetchProducts: () => {}
      }
    })

    const vuetify = createVuetify()

    const wrapper = mount(ProductList, {
      global: {
        plugins: [store, vuetify]
      }
    })

    expect(wrapper.text()).toContain('Error al cargar productos.')
  })
})