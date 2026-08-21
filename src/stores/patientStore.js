import { defineStore } from 'pinia'

import { db } from '@/firebase/config'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
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
  },
})