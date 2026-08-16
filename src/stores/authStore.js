import { defineStore } from 'pinia'

import { auth, db } from '@/firebase/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    userProfile: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.user
    },

    isPatient: (state) => {
      return state.userProfile?.role === 'patient'
    },

    isDoctor: (state) => {
      return state.userProfile?.role === 'doctor'
    },

    fullName: (state) => {
      if (!state.userProfile) {
        return ''
      }

      return `${state.userProfile.firstName} ${state.userProfile.lastName}`
    },
  },

  actions: {
    clearError() {
      this.error = null
    },

    async loadUserProfile(userId) {
      try {
        const userDocument = await db
          .collection('users')
          .doc(userId)
          .get()

        if (userDocument.exists) {
          this.userProfile = {
            id: userDocument.id,
            ...userDocument.data(),
          }
        } else {
          this.userProfile = null
        }
      } catch (error) {
        console.error('Greška pri učitavanju profila:', error)

        this.error = 'Nije moguće učitati korisnički profil.'
      }
    },

    initializeAuth() {
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(
          async (firebaseUser) => {
            this.user = firebaseUser

            if (firebaseUser) {
              await this.loadUserProfile(firebaseUser.uid)
            } else {
              this.userProfile = null
            }

            unsubscribe()
            resolve(firebaseUser)
          },
          (error) => {
            console.error(
              'Greška pri provjeri autentifikacije:',
              error,
            )

            this.error =
              'Došlo je do greške pri provjeri korisničke sesije.'

            resolve(null)
          },
        )
      })
    },
  },
})