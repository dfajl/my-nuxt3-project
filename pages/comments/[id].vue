<template>
	<CommentCard v-if="currentComment" :comment="currentComment" />
	<span v-else>Nothing to render!</span>
</template>

<script setup lang="ts">
	import CommentCard from '@/components/CommentCard.vue';
	import type { Comment } from '@/types/Comments';

	const route = useRoute();
	const router = useRouter();

	// достаем данные из кэша
	const { data: comments } = useNuxtData('comments');

	const currentComment: Comment = comments.value?.find(
		(comment: Comment) => String(comment.id) === route.params.id,
	);

	if (!currentComment) {
		router.push('/comments');
	}
</script>

<style scoped lang="scss"></style>
