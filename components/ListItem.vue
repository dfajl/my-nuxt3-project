<template>
	<div :class="`${componentUniqName}-item`" @click="navigateToUser(item.id)">
		<div v-if="isUser(item) && componentUniqName === 'users'">
			{{ item.name }}
			<br />
			ID: {{ item.id }}
		</div>
		<div v-else-if="isComment(item) && componentUniqName === 'comments'">
			Comment ID - {{ item.id }}
			<br />
			Comment email - {{ item.email }} ID: {{ item.id }}
			<br />
		</div>
		<div v-else-if="isPost(item) && componentUniqName === 'posts'">
			{{ item.title }}
			<br />
			ID: {{ item.id }}
		</div>
		<div v-else-if="isPhoto(item) && componentUniqName === 'photos'">
			Image URL:
			{{ item.url }}
			<br />
			ID: {{ item.id }}
		</div>
		<UIButton width="20px" height="20px" @click.stop="deleteItem(item)">
			<UIIcon name="material-icons" color="white">close</UIIcon>
		</UIButton>
	</div>
</template>

<script setup lang="ts">
	import type { User, Comment, Post, Photo } from '@/types/FetchedData';
	import { useRouter } from 'vue-router';
	import UIButton from '@/components/UI/UIButton.vue';
	import UIIcon from '@/components/UI/UIIcon.vue';
	import { storeToRefs } from 'pinia';
	import { usePhotosStore } from '@/stores/photosStore';

	const props = defineProps<{
		componentUniqName: 'users' | 'comments' | 'posts' | 'photos';
		item: User | Comment | Post | Photo;
	}>();

	const postsData = useState<Post[]>('posts');
	const { photos } = storeToRefs(usePhotosStore());

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

	const router = useRouter();
	const emit = defineEmits(['deleteItem']);

	const deleteItem = (item: User | Comment | Post | Photo) => {
		if (props.componentUniqName === 'posts') {
			postsData.value = toRaw(postsData.value).filter(
				(post) => post.id !== item.id,
			);
		} else if (props.componentUniqName === 'photos') {
			photos.value = toRaw(photos.value).filter(
				(photo) => photo.id !== item.id,
			);
		} else {
			emit('deleteItem');
		}
	};

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
