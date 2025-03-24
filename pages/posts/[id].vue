<template>
	<PostCard v-if="currentPost" :post="currentPost" />
	<span v-else>Nothing to render!</span>
</template>

<script setup lang="ts">
	import type { Post } from '@/types/FetchedData';
	import PostCard from '@/components/PostCard.vue';

	const route = useRoute();
	const router = useRouter();

	const postsData = useState<Post[]>('posts');

	const currentPost: Post | undefined = postsData.value?.find(
		(post: Post) => String(post.id) === route.params.id,
	);

	if (!currentPost) {
		/* throw createError({
			statusCode: 404,
			statusMessage: `Post not found: ${route.params.id}`,
		}); */
		showError({
			statusCode: 404,
			statusMessage: `Post not found: ${route.params.id}`,
		});
		/* Работают идентично */
	}
</script>

<style scoped lang="scss"></style>
