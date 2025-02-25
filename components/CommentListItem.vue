<template>
	<div class="comment-item" v-for="comment in comments" :key="comment.id">
		<!-- @click="navigateToUser(user.id)" -->
		Comment ID - {{ comment.id }} <br />
		Comment email - {{ comment.email }}
	</div>
</template>

<script setup lang="ts">
	import type { Comment } from '@/types/Comments';
	import { useRouter } from 'vue-router';

	const props = defineProps<{
		comments: Comment[];
	}>();

	const router = useRouter();

	const navigateToUser = (id: string | number) => {
		router.push(`/users/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/commentListItem.scss';
</style>
