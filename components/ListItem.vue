<template>
	<div :class="`${componentUniqName}-item`" @click="navigateToUser(item.id)">
		<div
			v-if="
				componentUniqName === 'users' &&
				isCorrectType < User > (item, componentUniqType)
			"
		>
			{{ item.name }}
		</div>
		<div
			v-else-if="
				componentUniqName === 'comments' &&
				isCorrectType < Comment > (item, componentUniqType)
			"
		>
			Comment ID - {{ item.id }}
			<br />
			Comment email - {{ item.email }}
		</div>
		<div
			v-else-if="
				componentUniqName === 'posts' &&
				isCorrectType < Post > (item, componentUniqType)
			"
		>
			{{ item.title }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { User, Comment, Post } from '@/types/FetchedData';
	import { useRouter } from 'vue-router';

	const isCorrectType = <T>(item: unknown, key: string): item is T => {
		return typeof item === 'object' && item !== null && key in item;
	};

	const props = defineProps<{
		componentUniqName: string;
		item: User | Comment | Post;
		componentUniqType: 'username' | 'postId' | 'userId';
	}>();

	const router = useRouter();

	const navigateToUser = (id: string | number) => {
		router.push(`/${props.componentUniqName}/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userListItem.scss';
	@import '@/assets/styles/commentListItem.scss';
	@import '@/assets/styles/postListItem.scss';
</style>
