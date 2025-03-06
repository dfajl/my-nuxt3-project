<template>
	<PhotoCard v-if="currentPhoto" :photo="currentPhoto" />
	<span v-else>Nothing to render!</span>
</template>

<script setup lang="ts">
	import type { Photo } from '@/types/FetchedData';
	import PhotoCard from '@/components/PhotoCard.vue';

	import { usePhotosStore } from '@/stores/photosStore';
	import { storeToRefs } from 'pinia';
	const photosStore = usePhotosStore();
	const { photos } = storeToRefs(photosStore);

	const route = useRoute();
	const router = useRouter();

	const currentPhoto: Photo | undefined = photos.value?.find(
		(post: Photo) => String(post.id) === route.params.id,
	);

	if (!currentPhoto) {
		router.push('/photos');
	}
</script>

<style scoped lang="scss"></style>
