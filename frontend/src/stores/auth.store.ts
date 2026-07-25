import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    userEmail: '' as string,
  }),
  getters: {
    isAuthenticated: (state) => state.token.length > 0,
  },
  actions: {
    setSession(token: string, userEmail: string) {
      this.token = token;
      this.userEmail = userEmail;
    },
    clearSession() {
      this.token = '';
      this.userEmail = '';
    },
  },
});
