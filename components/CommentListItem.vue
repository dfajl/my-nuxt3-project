<template>
	<div
		class="comment-item"
		v-for="comment in items"
		:key="comment.id"
		@click="navigateToComment(comment.id)"
	>
		Comment ID - {{ comment.id }}
		<br />
		Comment email - {{ comment.email }}
	</div>
</template>

<script setup lang="ts">
	import type { Comment } from '@/types/FetchedData';
	import { useRouter } from 'vue-router';

	const props = defineProps<{
		items: Comment[];
	}>();

	const router = useRouter();

	const navigateToComment = (id: string | number) => {
		router.push(`/comments/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/commentListItem.scss';
</style>
