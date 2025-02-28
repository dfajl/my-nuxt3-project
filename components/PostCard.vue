<template>
	<div class="post-card">
		<h3 class="post-card__title">{{ post.title }}</h3>
		<p class="post-card__body">{{ post.body }}</p>
	</div>
</template>

<script setup lang="ts">
	import type { Post } from '@/types/FetchedData';

	const props = defineProps<{
		post: Post;
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/postCard.scss';
</style>
