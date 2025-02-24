<template>
	<UserList v-if="status === 'success' && users.length" :users="users" />
	<div class="loading-users">Loading...</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import UserList from '@/components/UserList.vue';
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
</script>

<style lang="scss" scoped>
	.loading-users {
		width: 100%;
		height: 200px;
		padding: 50px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
