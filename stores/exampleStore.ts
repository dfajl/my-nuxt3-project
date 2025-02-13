// stores/user.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
	username: string;
}

export const useUserStore = defineStore('user', () => {
	const user = ref<User | null>(null);
	const isLoggedIn = ref(false);
	const number = ref(666);
	const setUser = (newUser: User) => {
		user.value = newUser;
		isLoggedIn.value = true;
	};

	const logout = () => {
		user.value = null;
		isLoggedIn.value = false;
	};

	return { user, isLoggedIn, setUser, logout, number };
});
