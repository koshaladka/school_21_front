<template>
  <v-data-table
    class="elevation-1"
    :headers="store.headers"
    :items="store.items"
    :items-per-page="10"
  ></v-data-table>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useTableStore } from '@/stores/table'

  const store = useTableStore()

  onMounted(() => {
    store.getUsers()
  })

</script>

<style scoped lang="sass">

</style>
