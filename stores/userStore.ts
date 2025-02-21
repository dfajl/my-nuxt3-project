// stores/user.ts
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAPI } from '@/hooks/useApi';

export const useUserStore = defineStore('user', () => {
	const users = ref([]);
	const statusResponse = ref('idle');
	const executeFn = ref(null);

	async function fetchUsers() {
		const { data, status, execute } = await useFetch(
			'https://jsonplaceholder.typicode.com/users',
			{
				lazy: true,
			},
		);
		users.value = data;
		statusResponse.value = status;
		executeFn.value = execute;
		console.log('status', status);
	}

	// Второй вариант позволяет увидеть запрос в консоли браузера.
	// Потому что $fetch срабатывает на клиенте, а useFetch на сервере.

	/* async function fetchUsers() {
		const data = await $fetch('https://jsonplaceholder.typicode.com/users');
		users.value = data;
	} */

	return { users, fetchUsers, statusResponse, executeFn };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
