<template>
	<div class="user-list_wrappepr">
		<div
			v-if="status === 'success'"
			class="user-item"
			v-for="user in users"
			:key="user.id"
			@click="navigateToUser(user.id)"
		>
			{{ user.name }}
		</div>
		<span v-else>Loading...</span>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import type { User } from '@/types/Users';

	const router = useRouter();

	const {
		data: users,
		status,
		error,
	} = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
		lazy: true,
		key: 'users',
	});

	watch(error, (value: any) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
			if (value instanceof Error) {
				console.error('Ошибка API:', value.message);
			}
		}
	});

	const navigateToUser = (id: string | number) => {
		router.push(`/user-profile/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userListPage.scss';
</style>
