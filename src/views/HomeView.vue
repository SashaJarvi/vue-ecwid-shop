<template>
  <section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <template v-if="categories.length && !categoriesLoading">
        <nav class="w-full px-6 py-1">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <h2 class="uppercase tracking-wide font-bold text-gray-800 text-xl">Категории</h2>

            <div class="flex items-center gap-[10px]">
              <button class="w-[24px] h-[24px]" @click="setCategoriesViewMode('grid')">
                <svg
                  :fill="categoriesViewMode === 'grid' ? '#000000' : '#7f7f7f'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 20 20"
                  class="transition"
                >
                  <path
                    d="M19,20H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1v18C20,19.6,19.6,20,19,20z M2,18h16V2H2V18z"
                  />
                  <rect x="4" y="4" width="5" height="5" />
                  <rect x="11" y="4" width="5" height="5" />
                  <rect x="4" y="11" width="5" height="5" />
                  <rect x="11" y="11" width="5" height="5" />
                </svg>
              </button>

              <button class="w-[24px] h-[24px]" @click="setCategoriesViewMode('list')">
                <svg
                  :fill="categoriesViewMode === 'list' ? '#000000' : '#7f7f7f'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 20 20"
                  class="transition"
                >
                  <path
                    d="M19,20H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1v18C20,19.6,19.6,20,19,20z M2,18h16V2H2V18z"
                  />
                  <rect x="5" y="5" width="10" height="2" />
                  <rect x="5" y="9" width="10" height="2" />
                  <rect x="5" y="13" width="10" height="2" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <category-card
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :view-mode="categoriesViewMode"
        />
      </template>

      <template v-if="products.length && !productsLoading">
        <nav class="w-full px-6 py-1">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <h2 class="uppercase tracking-wide font-bold text-gray-800 text-xl">Товары</h2>

            <div class="flex items-center gap-[10px]">
              <button class="w-[24px] h-[24px]" @click="setProductsViewMode('grid')">
                <svg
                  :fill="productsViewMode === 'grid' ? '#000000' : '#7f7f7f'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 20 20"
                  class="transition"
                >
                  <path
                    d="M19,20H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1v18C20,19.6,19.6,20,19,20z M2,18h16V2H2V18z"
                  />
                  <rect x="4" y="4" width="5" height="5" />
                  <rect x="11" y="4" width="5" height="5" />
                  <rect x="4" y="11" width="5" height="5" />
                  <rect x="11" y="11" width="5" height="5" />
                </svg>
              </button>

              <button class="w-[24px] h-[24px]" @click="setProductsViewMode('list')">
                <svg
                  :fill="productsViewMode === 'list' ? '#000000' : '#7f7f7f'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 20 20"
                  class="transition"
                >
                  <path
                    d="M19,20H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1v18C20,19.6,19.6,20,19,20z M2,18h16V2H2V18z"
                  />
                  <rect x="5" y="5" width="10" height="2" />
                  <rect x="5" y="9" width="10" height="2" />
                  <rect x="5" y="13" width="10" height="2" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <product-card v-for="product in products" :key="product.id" :product="product" :view-mode="productsViewMode" />
      </template>

      <the-loader v-if="productsLoading" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import type { ViewMode } from '@/types/types/view-mode'
import ProductCard from '@/components/ProductCard.vue'
import TheLoader from '@/components/TheLoader.vue'
import CategoryCard from '@/components/CategoryCard.vue'

const { loading: productsLoading, products } = storeToRefs(useProductsStore())
const { loading: categoriesLoading, categories } = storeToRefs(useCategoriesStore())
const { fetchProducts, resetAllProductsData } = useProductsStore()
const { fetchCategories, resetAllCategoriesData } = useCategoriesStore()

const categoriesViewMode: Ref<ViewMode> = ref('grid')
const productsViewMode: Ref<ViewMode> = ref('grid')

const setCategoriesViewMode = (mode: ViewMode) => {
  categoriesViewMode.value = mode
}

const setProductsViewMode = (mode: ViewMode) => {
  productsViewMode.value = mode
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

onUnmounted(() => {
  resetAllCategoriesData()
  resetAllProductsData()
})
</script>
