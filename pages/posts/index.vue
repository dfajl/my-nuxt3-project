<template>
	<CommonList
		component-uniq-name="posts"
		component-uniq-type="userId"
		:data="sortedFilteredPosts"
		v-if="posts?.length"
	/>
	<UILoading v-else message="Posts loading..." />
	<div ref="observer" style="height: 1px; width: 100%"></div>
</template>

<script setup lang="ts">
	import { usePosts } from '@/hooks/usePosts';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';
	import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

	import type { Post } from '@/types/FetchedData';
	export type InjectedSelectValue = 'title' | 'body' | '';

	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const observer = ref<HTMLElement | null>(null);

	const posts = useState<Post[]>('posts', () => []);

	const { startIndex, fetchPosts, incrementStartIndex } = usePosts();

	await callOnce(async () => {
		const newPosts = await fetchPosts();
		if (newPosts) {
			posts.value = newPosts;
		}
	});

	const sortedFilteredPosts = useSortedFilteredData<Post>(
		posts,
		inputValue!,
		'title',
		selectedValue!,
	);

	useIntersectionObserver(observer, () => incrementStartIndex(10));

	watch(startIndex, async (value) => {
		if (value) {
			const newPosts = await fetchPosts();
			if (newPosts) {
				posts.value = toRaw(posts.value).concat(newPosts);
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
