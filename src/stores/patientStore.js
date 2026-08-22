import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const usePatientStore = defineStore('patient', {
    state: () => ({
      patients: [],
      selectedPatient: null,
      glucoseReadings: [],
      medications: [],
      meals: [],
      activities: [],
      loading: false,
      error: null,
    }),

  actions: {
    async fetchPatients(doctorId) {
      this.loading = true
      this.error = null

      try {
        const relationsSnapshot = await db
          .collection('doctorPatientRelations')
          .where('doctorId', '==', doctorId)
          .where('status', '==', 'active')
          .get()

        const patients = []

        for (const relation of relationsSnapshot.docs) {
          const relationData = relation.data()

          const patientDocument = await db
            .collection('users')
            .doc(relationData.patientId)
            .get()

          if (patientDocument.exists) {
            patients.push({
              id: patientDocument.id,
              ...patientDocument.data(),
            })
          }
        }

        this.patients = patients
      } catch (error) {
        console.error(
          'Greška kod dohvaćanja pacijenata:',
          error,
        )

        this.error =
          'Greška kod dohvaćanja pacijenata.'
      } finally {
        this.loading = false
      }
    },

    clearPatients() {
      this.patients = []
    },

    async fetchPatientDetails(patientId) {
        this.loading = true
        this.error = null

        try {
            const patientDocument = await db
            .collection('users')
            .doc(patientId)
            .get()

            if (patientDocument.exists) {
            this.selectedPatient = {
                id: patientDocument.id,
                ...patientDocument.data(),
            }
            }

            const glucoseSnapshot = await db
            .collection('glucoseReadings')
            .where('userId', '==', patientId)
            .get()

            this.glucoseReadings = glucoseSnapshot.docs.map(
            (document) => {
                const data = document.data()

                return {
                id: document.id,
                ...data,
                measuredAtDate: data.measuredAt
                    ? data.measuredAt.toDate()
                    : new Date(0),
                }
            },
            )

            this.glucoseReadings.sort(
            (a, b) =>
                b.measuredAtDate - a.measuredAtDate,
            )

            const medicationsSnapshot = await db
            .collection('medications')
            .where('userId', '==', patientId)
            .get()

            this.medications = medicationsSnapshot.docs.map(
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

            const mealsSnapshot = await db
            .collection('meals')
            .where('userId', '==', patientId)
            .get()

            this.meals = mealsSnapshot.docs.map(
            (document) => {
                const data = document.data()

                return {
                id: document.id,
                ...data,
                consumedAtDate: data.consumedAt
                    ? data.consumedAt.toDate()
                    : new Date(0),
                }
            },
            )

            const activitiesSnapshot = await db
            .collection('activities')
            .where('userId', '==', patientId)
            .get()

            this.activities = activitiesSnapshot.docs.map(
            (document) => {
                const data = document.data()

                return {
                id: document.id,
                ...data,
                performedAtDate: data.performedAt
                    ? data.performedAt.toDate()
                    : new Date(0),
                }
            },
            )
        } catch (error) {
            console.error(
            'Greška kod dohvaćanja podataka pacijenta:',
            error,
            )

            this.error =
            'Greška kod dohvaćanja podataka pacijenta.'
        } finally {
            this.loading = false
        }
    },
  },
})