import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';
import { API_URL } from '@/config/api';

interface User {
  email: string;
  city: string;
  date: string;
}

export const useTableStore = defineStore('table', () => {
  const headers = [
    { text: 'E-mail', value: 'email' },
    { text: 'Город', value: 'city' },
    { text: 'Дата и время добавления', value: 'date' },
  ]

  const items = ref<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_URL}users`);
      items.value = response.data;
    } catch (error) {
      console.error('Ошибка при получении данных пользователей:', error);
    }
  }

  return { headers, items, getUsers }
})
