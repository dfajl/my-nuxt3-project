<template>
	<CommonList
		component-uniq-name="users"
		component-uniq-type="username"
		v-if="status === 'success' && users?.length"
		:data="sortedFilteredUsers"
		@delete-item="deleteItem"
	/>
	<UILoading v-else message="Users loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import type { User } from '@/types/FetchedData';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';

	export type InjectedSelectValue = 'name' | 'username' | 'email' | '';

	const router = useRouter();
	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const {
		data: users,
		status,
		error,
	} = await useFetch<User[]>('https://jsonplaceholder.typicode.com/users', {
		lazy: true,
		key: 'users',
	});

	const sortedFilteredUsers = useSortedFilteredData<User>(
		users,
		inputValue!,
		'name',
		selectedValue!,
	);

	const deleteItem = (item: User) => {
		if (users.value) {
			users.value = toRaw(users.value).filter(
				(user) => user.id !== item.id,
			);
		}
	};

	watch(error, (value: any) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
			if (value instanceof Error) {
				console.error('Ошибка API:', value.message);
			}
		}
	});

	onUnmounted(() => {
		/* 
			сбрасываем параметры поиска / сортировки 
			при переходе на новую страницу 
		*/
		if (selectedValue) {
			selectedValue.value = '';
		}
		if (inputValue) {
			inputValue.value = '';
		}
	});
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
