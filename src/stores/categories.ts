import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '@/api/api-service'
import type { IItemsResponse } from '@/types/interfaces/items-response'
import type { ICategory } from '@/types/interfaces/category'

export const useCategoriesStore = defineStore('categories', () => {
  const categories: Ref<ICategory[]> = ref([])
  const category: Ref<ICategory | null> = ref(null)
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    categories.value = []

    try {
      const { items } = await apiService.get<IItemsResponse<ICategory>>(
        '/categories?responseFields=items(id,name,thumbnailUrl)'
      )
      categories.value = items
    } catch (error: any) {
      error.value = error.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  const fetchCategory = async (categoryId: number) => {
    loading.value = true
    error.value = null
    category.value = null

    try {
      category.value = await apiService.get<ICategory>(`/categories/${categoryId}`)
    } catch (error: any) {
      error.value = error.message
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }

  const resetAllCategoriesData = () => {
    categories.value = []
    category.value = null
    loading.value = false
    error.value = null
  }

  return {
    categories,
    category,
    loading,
    error,
    fetchCategories,
    fetchCategory,
    resetAllCategoriesData
  }
})
