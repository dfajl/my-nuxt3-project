<template>
	<CommonList
		component-uniq-name="posts"
		component-uniq-type="userId"
		:data="posts"
		v-if="posts?.length"
	/>
	<UILoading v-else message="Posts loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { usePostsState } from '@/stores/postsStore';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';

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

	watch(error, (value) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
		}
	});
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
