<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="py-4 bg-teal-darken-4"
        color="surface-variant"
        image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
        prepend-icon="mdi-rocket-launch-outline"
        rounded="lg"
        variant="tonal"
      >
        <template #title>
          <h2 class="text-h5 font-weight-bold">Добавить новую запись</h2>
        </template>

        <template #text>
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="formStore.email"
              label="E-mail"
              required
              :rules="emailRules"
              type="email"
            />
            <v-autocomplete
              v-model="formStore.city"
              :items="formStore.cities"
              label="Выберите город"
              required
            />
            <v-btn
              block
              class="mt-2"
              color="teal-darken-3"
              type="submit"
            >
              Добавить
            </v-btn>
          </v-form>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useFormStore } from '@/stores/form'
  import { useTableStore } from '@/stores/table'

  const tableStore = useTableStore()

  const formStore = useFormStore()

  const form = ref(null)

  onMounted(() => {
    formStore.getCities()
  })

  const emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]

  const submit = async () => {
    await formStore.submitForm()
    if (form.value) {
      form.value.reset()
    }
    await tableStore.getUsers()
  }
</script>

<style scoped lang="sass">

</style>
