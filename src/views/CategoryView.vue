<template>
  <section class="bg-white py-8">
    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <button class="flex items-center gap-[8px] mb-4" @click="router.back()">
        <img class="w-[20px] h-[20px]" :src="LeftArrowIcon" alt="" />

        Назад
      </button>

      <template v-if="category && !categoryLoading && products.length && !productsLoading">
        <nav class="w-full px-6 py-1">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <h2 class="uppercase tracking-wide font-bold text-gray-800 text-xl">{{ category.name }}</h2>

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

      <the-loader v-if="categoryLoading || productsLoading" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import type { ViewMode } from '@/types/types/view-mode'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg?url'
import ProductCard from '@/components/ProductCard.vue'
import TheLoader from '@/components/TheLoader.vue'

const router = useRouter()
const route = useRoute()

const { loading: categoryLoading, category } = storeToRefs(useCategoriesStore())
const { loading: productsLoading, products } = storeToRefs(useProductsStore())
const { fetchCategory, resetAllCategoriesData } = useCategoriesStore()
const { fetchProductsByCategoryId, resetAllProductsData } = useProductsStore()

const productsViewMode: Ref<ViewMode> = ref('grid')

const categoryId = computed(() => route.params.categoryId as string)

const setProductsViewMode = (mode: ViewMode) => {
  productsViewMode.value = mode
}

watch(categoryId, async (value) => {
  if (!value) return

  await fetchCategory(parseInt(categoryId.value))
})

watch(
  category,
  async (value) => {
    if (!value) return
    await fetchProductsByCategoryId(value.id)
  },
  { deep: true }
)

onMounted(async () => {
  await fetchCategory(parseInt(categoryId.value))
})

onUnmounted(() => {
  resetAllCategoriesData()
  resetAllProductsData()
})
</script>

<style scoped></style>
