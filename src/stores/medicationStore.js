import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const useMedicationStore = defineStore(
  'medication',
  {
    state: () => ({
      medications: [],
      loading: false,
      error: null,
    }),

    actions: {
      async fetchMedications(userId) {
        this.loading = true
        this.error = null

        try {
          const snapshot = await db
            .collection('medications')
            .where('userId', '==', userId)
            .get()

          this.medications = snapshot.docs.map(
            (document) => {
              const data = document.data()

              return {
                id: document.id,
                ...data,
                takenAtDate: data.takenAt
                  ? data.takenAt.toDate()
                  : new Date(0),
              }
            },
          )

          this.medications.sort(
            (a, b) =>
              b.takenAtDate - a.takenAtDate,
          )
        } catch (error) {
          console.error(
            'Greška kod dohvaćanja lijekova:',
            error,
          )

          this.error =
            'Greška kod dohvaćanja lijekova.'
        } finally {
          this.loading = false
        }
      },

      async addMedication(data) {
        this.loading = true
        this.error = null

        try {
            
          await db
            .collection('medications')
            .add({
              userId: data.userId,
              name: data.name,
              dosage: Number(data.dosage),
              unit: data.unit,
              takenAt: new Date(data.takenAt),
              note: data.note,
              createdAt: new Date(),
            })

          await this.fetchMedications(
            data.userId,
          )
        } catch (error) {
          console.error(
            'Greška kod spremanja lijeka:',
            error,
          )

          this.error =
            'Greška kod spremanja lijeka.'
        } finally {
          this.loading = false
        }
      },

      clearMedications() {
        this.medications = []
      },
    },
  },
)