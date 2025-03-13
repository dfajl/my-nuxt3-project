<template>
	<CommonList
		component-uniq-name="comments"
		component-uniq-type="postId"
		:data="sortedFilteredComments"
		v-if="status === 'success' && comments?.length"
	/>
	<UILoading v-else message="Comments loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import type { Comment } from '@/types/FetchedData';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';
	import { apiFetch } from '@/utils/customUseFetch';

	export type InjectedSelectValue = 'name' | 'body' | 'email' | '';

	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const router = useRouter();

	// пример использоания middleware
	definePageMeta({
		middleware: 'example',
	});

	const limit = ref(10);
	const startIndex = ref(0);

	const {
		data: comments,
		status,
		error,
	} = await useLazyAsyncData<Comment[]>(
		'comments',
		() =>
			$fetch('https://jsonplaceholder.typicode.com/comments', {
				params: {
					_limit: limit.value,
					_start: startIndex.value,
				},
			}),
		/*	
			Вариант использования кастомного $fetch. 
			Вроде, работает, но
			при ошибке в запросе почему-то вызывается дважды.
		*/

		/* apiFetch('/comments', {
				params: {
					_limit: limit.value,
					_start: startIndex.value,
				},
			}), */

		{
			watch: [limit, startIndex],
		},
	);

	const sortedFilteredComments = useSortedFilteredData<Comment>(
		comments,
		inputValue!,
		'email',
		selectedValue!,
	);

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

<style scoped lang="scss">
	@import '@/assets/styles/uiLoading.scss';
</style>
