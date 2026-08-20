import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const useMealStore = defineStore('meal', {
  state: () => ({
    meals: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMeals(userId) {
      this.loading = true
      this.error = null

      try {
        const snapshot = await db
          .collection('meals')
          .where('userId', '==', userId)
          .get()

        this.meals = snapshot.docs.map((document) => {
          const data = document.data()

          return {
            id: document.id,
            ...data,
            consumedAtDate: data.consumedAt
              ? data.consumedAt.toDate()
              : new Date(0),
          }
        })

        this.meals.sort(
          (a, b) =>
            b.consumedAtDate - a.consumedAtDate,
        )
      } catch (error) {
        console.error(
          'Greška kod dohvaćanja obroka:',
          error,
        )

        this.error =
          'Greška kod dohvaćanja obroka.'
      } finally {
        this.loading = false
      }
    },

    async addMeal(data) {
      this.loading = true
      this.error = null

      try {
        await db
          .collection('meals')
          .add({
            userId: data.userId,
            name: data.name,
            mealType: data.mealType,
            description: data.description,
            carbohydrates: Number(
              data.carbohydrates,
            ),
            consumedAt: new Date(
              data.consumedAt,
            ),
            note: data.note,
            createdAt: new Date(),
          })

        await this.fetchMeals(data.userId)
      } catch (error) {
        console.error(
          'Greška kod spremanja obroka:',
          error,
        )

        this.error =
          'Greška kod spremanja obroka.'
      } finally {
        this.loading = false
      }
    },

    clearMeals() {
      this.meals = []
    },
  },
})