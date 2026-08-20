import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchActivities(userId) {
      this.loading = true
      this.error = null

      try {
        const snapshot = await db
          .collection('activities')
          .where('userId', '==', userId)
          .get()

        this.activities = snapshot.docs.map((document) => {
          const data = document.data()

          return {
            id: document.id,
            ...data,
            performedAtDate: data.performedAt
              ? data.performedAt.toDate()
              : new Date(0),
          }
        })

        this.activities.sort(
          (a, b) =>
            b.performedAtDate - a.performedAtDate,
        )
      } catch (error) {
        console.error(
          'Greška kod dohvaćanja aktivnosti:',
          error,
        )

        this.error =
          'Greška kod dohvaćanja aktivnosti.'
      } finally {
        this.loading = false
      }
    },

    async addActivity(data) {
      this.loading = true
      this.error = null

      try {
        await db
          .collection('activities')
          .add({
            userId: data.userId,
            name: data.name,
            activityType: data.activityType,
            duration: Number(data.duration),
            intensity: data.intensity,
            calories: Number(data.calories),
            performedAt: new Date(
              data.performedAt,
            ),
            note: data.note,
            createdAt: new Date(),
          })

        await this.fetchActivities(
          data.userId,
        )
      } catch (error) {
        console.error(
          'Greška kod spremanja aktivnosti:',
          error,
        )

        this.error =
          'Greška kod spremanja aktivnosti.'
      } finally {
        this.loading = false
      }
    },

    clearActivities() {
      this.activities = []
    },
  },
})