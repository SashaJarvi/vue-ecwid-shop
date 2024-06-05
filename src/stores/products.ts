import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '@/api/api-service'
import type { IProduct } from '@/types/interfaces/product'
import type { IItemsResponse } from '@/types/interfaces/items-response'

export const useProductsStore = defineStore('products', () => {
  const products: Ref<IProduct[]> = ref([])
  const product: Ref<IProduct | null> = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    products.value = []

    try {
      const { items } = await apiService.get<IItemsResponse<IProduct>>(
        '/products?responseFields=items(id,price,name,thumbnailUrl)'
      )
      products.value = items
    } catch (error: any) {
      error.value = error.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  const fetchProduct = async (productId: number) => {
    loading.value = true
    error.value = null
    product.value = null

    try {
      product.value = await apiService.get<IProduct>(
        `/products/${productId}?responseFields=id,price,name,description,thumbnailUrl`
      )
    } catch (error: any) {
      error.value = error.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  const fetchProductsByCategoryId = async (categoryId: number) => {
    loading.value = true
    error.value = null
    products.value = []

    try {
      const { items } = await apiService.get<IItemsResponse<IProduct>>(`/products?categories=${categoryId}`)
      products.value = items
    } catch (error: any) {
      error.value = error.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  const resetAllProductsData = () => {
    products.value = []
    product.value = null
    loading.value = false
    error.value = null
  }

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    fetchProductsByCategoryId,
    resetAllProductsData
  }
})
