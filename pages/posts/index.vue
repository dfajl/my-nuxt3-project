<template>
	<CommonList
		component-uniq-name="posts"
		component-uniq-type="userId"
		:data="postsData"
		v-if="postsData?.length"
	/>
	<UILoading v-else message="Posts loading..." />
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import type { Post } from '@/types/FetchedData';

	const router = useRouter();

	const postsData = useState<Post[]>('posts');

	await callOnce(async () => {
		postsData.value = await $fetch(
			'https://jsonplaceholder.typicode.com/posts',
		);
	});

	/* watch(error, (value: any) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
			if (value instanceof Error) {
				console.error('Ошибка API:', value.message);
			}
		}
	}); */
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
