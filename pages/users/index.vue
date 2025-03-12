<template>
	{{ selectedValue }}
	<CommonList
		component-uniq-name="users"
		component-uniq-type="username"
		v-if="status === 'success' && users?.length"
		:data="filteredUsers"
	/>
	<UILoading v-else message="Users loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import type { User } from '@/types/FetchedData';
	import { useFilteredData } from '@/hooks/useFilteredData';

	const router = useRouter();
	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<string | number>>('selectedValue');

	const {
		data: users,
		status,
		error,
	} = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
		lazy: true,
		key: 'users',
	});

	const filteredUsers = useFilteredData<User>(users, inputValue, 'name');

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
