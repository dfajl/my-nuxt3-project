<template>
	<div :class="`${componentUniqName}-item`" @click="navigateToUser(item.id)">
		<div v-if="isUser(item) && componentUniqName === 'users'">
			{{ item.name }}
		</div>
		<div v-else-if="isComment(item) && componentUniqName === 'comments'">
			Comment ID - {{ item.id }}
			<br />
			Comment email - {{ item.email }}
		</div>
		<div v-else-if="isPost(item) && componentUniqName === 'posts'">
			{{ item.title }}
		</div>
		<div v-else-if="isPhoto(item) && componentUniqName === 'photos'">
			Image URL:
			{{ item.url }}
			<br />
			ID: {{ item.id }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { User, Comment, Post, Photo } from '@/types/FetchedData';
	import { useRouter } from 'vue-router';

	/* 
		Вариант обобщенного тайп-предиката. Но он не корректный.
		Виимо, единственный вариант - делать тайп-предикат на каждый отдельй случай.

		const isCorrectType = <T>(item: unknown, key: string): item is T => {
			return typeof item === 'object' && item !== null && key in item;
		}; 
	*/

	const isUser = (item: unknown): item is User => {
		return typeof item === 'object' && item !== null && 'name' in item;
	};

	const isComment = (item: unknown): item is Comment => {
		return typeof item === 'object' && item !== null && 'email' in item;
	};

	const isPost = (item: unknown): item is Post => {
		return typeof item === 'object' && item !== null && 'title' in item;
	};

	const isPhoto = (item: unknown): item is Photo => {
		return typeof item === 'object' && item !== null && 'url' in item;
	};

	const props = defineProps<{
		componentUniqName: 'users' | 'comments' | 'posts' | 'photos';
		item: User | Comment | Post | Photo;
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
	@import '@/assets/styles/photoListItem.scss';
</style>
