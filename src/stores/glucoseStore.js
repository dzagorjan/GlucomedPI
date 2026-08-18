import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const useGlucoseStore = defineStore('glucose', {
  state: () => ({
    readings: [],
    loading: false,
    error: null,
  }),

  getters: {
    sortedReadings: (state) => {
      return [...state.readings].sort((a, b) => {
        return b.measuredAtDate - a.measuredAtDate
      })
    },

    latestReading() {
      if (this.sortedReadings.length === 0) {
        return null
      }

      return this.sortedReadings[0]
    },

    readingCount: (state) => {
      return state.readings.length
    },

    getReadingById: (state) => {
        return (readingId) => {
            return state.readings.find(
                (reading) => reading.id === readingId,
            )
        }
    },
  },

  actions: {
    clearError() {
      this.error = null
    },

    //READ
    async fetchReadings(userId) {
      if (!userId) {
        this.readings = []
        return
      }

      this.loading = true
      this.error = null

      try {
        const snapshot = await db
          .collection('glucoseReadings')
          .where('userId', '==', userId)
          .get()

        this.readings = snapshot.docs.map((document) => {
          const data = document.data()

          return {
            id: document.id,
            ...data,

            measuredAtDate: data.measuredAt
              ? data.measuredAt.toDate()
              : new Date(0),
          }
        })
      } catch (error) {
        console.error(
          'Greška pri dohvaćanju mjerenja glukoze:',
          error,
        )

        this.error =
          'Nije moguće dohvatiti mjerenja glukoze.'

        this.readings = []
      } finally {
        this.loading = false
      }
    },

    //CREATE
    async addReading(data) {
    this.loading = true
    this.error = null

    try {
        await db
        .collection('glucoseReadings')
        .add({
            userId: data.userId,
            value: Number(data.value),
            unit: data.unit,
            measurementType: data.measurementType,
            measuredAt: new Date(data.measuredAt),
            note: data.note,
            createdAt: new Date(),
        })

        await this.fetchReadings(data.userId)
    } catch (error) {
        console.error(
        'Greška kod spremanja mjerenja:',
        error,
        )

        this.error = 'Greška kod spremanja mjerenja.'
    } finally {
        this.loading = false
    }
    },

    //UPDATE
    async updateReading(readingId, data) {
        this.loading = true
        this.error = null

        try {
            await db
            .collection('glucoseReadings')
            .doc(readingId)
            .update({
                value: Number(data.value),
                unit: data.unit,
                measurementType: data.measurementType,
                measuredAt: new Date(data.measuredAt),
                note: data.note,
            })

                await this.fetchReadings(data.userId)
        } catch (error) {
            console.error(
            'Greška kod uređivanja mjerenja:',
            error,
            )

            this.error = 'Greška kod uređivanja mjerenja.'
        } finally {
            this.loading = false
        }
    },

    //DELETE
    async deleteReading(readingId, userId) {
        this.loading = true
        this.error = null

        try {
            await db
            .collection('glucoseReadings')
            .doc(readingId)
            .delete()

            await this.fetchReadings(userId)
        } catch (error) {
            console.error(
            'Greška kod brisanja mjerenja:',
            error,
            )

            this.error = 'Greška kod brisanja mjerenja.'
        } finally {
            this.loading = false
        }
    },

    clearReadings() {
      this.readings = []
      this.error = null
    },
  },
})