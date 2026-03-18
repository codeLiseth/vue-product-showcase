import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import ProductCard from '../components/ProductCard.vue'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Producto Test',
    price: 100,
    category: 'test',
    image: 'https://via.placeholder.com/150'
  }

  const store = createStore({
    getters: {
      isFavorite: () => () => false,
      isInCart: () => () => false
    },
    mutations: {
      TOGGLE_FAVORITE: () => {},
      ADD_TO_CART: () => {}
    }
  })

  const vuetify = createVuetify()

  it('renderiza correctamente el producto', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
      global: {
        plugins: [store, vuetify]
      }
    })

    expect(wrapper.text()).toContain('Producto Test')
    expect(wrapper.text()).toContain('100')
  })
})