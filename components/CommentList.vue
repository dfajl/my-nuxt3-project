<template>
	<div class="list_wrapper">
		<CommentListItem :comments="comments" />
	</div>
</template>

<script setup lang="ts">
	import type { Comment } from '@/types/Comments';
	import CommentListItem from '@/components/CommentListItem.vue';

	const props = defineProps<{
		comments: Comment[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/listWrapper.scss';
</style>
