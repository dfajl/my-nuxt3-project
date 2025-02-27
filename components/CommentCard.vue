<template>
	<div class="comment-card">
		<h3 class="comment-card__name">{{ comment.name }}</h3>
		<p class="comment-card__email">{{ comment.email }}</p>
		<p class="comment-card__body">{{ comment.body }}</p>
	</div>
</template>

<script setup lang="ts">
	import type { Comment } from '@/types/Comments';

	const props = defineProps<{
		comment: Comment;
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/commentCard.scss';
</style>
