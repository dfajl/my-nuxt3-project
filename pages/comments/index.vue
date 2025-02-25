<template>
	<CommentList
		:comments="comments"
		v-if="status === 'success' && comments?.length"
	/>
	<UILoading v-else message="Comments loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import type { Comment } from '@/types/Comments';
	import CommentList from '@/components/CommentList.vue';
	import UILoading from '@/components/UI/UILoading.vue';

	const router = useRouter();

	// пример использоания middleware
	definePageMeta({
		middleware: 'example',
	});

	const limit = ref(5);
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
		{
			watch: [limit, startIndex],
		},
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
</script>

<style scoped lang="scss">
	@import '@/assets/styles/uiLoading.scss';
</style>
