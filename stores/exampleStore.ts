// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		user: '',
		isLoggedIn: false,
		number: 555,
	}),
	actions: {
		setUser(user: string) {
			this.user = user;
			this.isLoggedIn = true;
		},
		logout() {
			this.user = '';
			this.isLoggedIn = false;
		},
	},
});
