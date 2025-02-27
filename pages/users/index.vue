<template>
	<CommonList
		:component="UserListItem"
		v-if="status === 'success' && users?.length"
		:data="users"
	/>
	<UILoading v-else message="Users loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import CommonList from '@/components/CommonList.vue';
	import UserListItem from '@/components/UserListItem.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import type { User } from '@/types/FetchedData';

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
	@import '@/assets/styles/uiLoading.scss';
</style>
