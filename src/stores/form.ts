import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/config/api'

export const useFormStore = defineStore('form', () => {
  const email = ref('')
  const city = ref('')
  const cities = ref([])

  const submitForm = async () => {
    try {
      const response = await axios.post(`${API_URL}user`, {
        email: email.value,
        city: city.value,
      })
      console.log('Успешно:', response.data);
      // Очистка формы после успешной отправки
      email.value = ''
      city.value = ''
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
    }
  }

  const getCities = async () => {
    try {
      const response = await axios.get<string[]>(`${API_URL}cities`)
      cities.value = response.data
    } catch (error) {
      console.error('Ошибка при получении списка городов:', error)
    }
  }

  return { email, city, cities, getCities, submitForm }
})
