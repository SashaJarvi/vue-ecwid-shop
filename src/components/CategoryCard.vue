<template>
  <article :class="wrapperClasses">
    <router-link :to="{ name: 'category', params: { categoryId: category.id } }" :class="cardClasses">
      <template v-if="viewMode === 'grid'">
        <img
          class="aspect-square hover:scale-105 hover:shadow-lg transition object-cover"
          :src="category.thumbnailUrl"
          :alt="category.name"
        />

        <div class="flex flex-col justify-between gap-[10px]">
          <div class="flex items-center justify-between">
            <h3 class="tracking-wide text-ml">{{ category.name }}</h3>
          </div>
        </div>
      </template>
      <template v-else-if="viewMode === 'list'">
        <img
          class="aspect-square hover:scale-105 hover:shadow-lg transition w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover"
          :src="category.thumbnailUrl"
          :alt="category.name"
        />

        <div class="flex flex-col justify-between gap-[10px] h-full">
          <div class="flex items-center justify-between">
            <h3 class="tracking-wide text-ml">{{ category.name }}</h3>
          </div>
        </div>
      </template>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import type { ViewMode } from '@/types/types/view-mode'
import type { ICategory } from '@/types/interfaces/category'
import { computed } from 'vue'

const props = defineProps<{
  viewMode: ViewMode
  category: ICategory
}>()

const wrapperClasses = computed(() => {
  return {
    'w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-6 flex flex-col': props.viewMode === 'grid',
    'w-full p-6 flex flex-row': props.viewMode === 'list'
  }
})
const cardClasses = computed(() => {
  return {
    'flex flex-col gap-[15px]': props.viewMode === 'grid',
    'flex items-start space-x-6': props.viewMode === 'list'
  }
})
</script>

<style scoped></style>
