<template>
	<CommonList
		component-uniq-name="posts"
		component-uniq-type="userId"
		:data="sortedFilteredPosts"
		v-if="posts?.length"
	/>
	<UILoading v-else message="Posts loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { usePostsState } from '@/stores/postsStore';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';

	import type { Post } from '@/types/FetchedData';
	export type InjectedSelectValue = 'title' | 'body' | '';

	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const router = useRouter();
	const { posts, error } = usePostsState();

	/*
		const posts = useState<Post[]>('posts');
		await callOnce(async () => {
			posts.value = await $fetch(
				'https://jsonplaceholder.typicode.com/posts',
			);
		});
	*/

	/* 
		Это пример из доки.
		Я же вынес это в компосабл. 
		Т.к. callOnce в компосабле вызывается синхронно, то теперь const { posts } надо юзать с проверками на наличие значения.

		Если же юзать await callOnce в script setup, то это делает под капотом Suspense.
	*/

	const sortedFilteredPosts = useSortedFilteredData<Post>(
		posts,
		inputValue!,
		'title',
		selectedValue!,
	);

	watch(error, (value) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
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
