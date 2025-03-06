<template>
	<div class="photo-card">
		<img
			:src="photo.thumbnailUrl"
			:alt="photo.title"
			class="photo-card__image"
		/>
		<div class="photo-card__content">
			<h3 class="photo-card__title">{{ photo.title }}</h3>
			<a :href="photo.url" target="_blank" class="photo-card__link"
				>View Full</a
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Photo } from '@/types/FetchedData';

	const props = defineProps<{
		photo: Photo;
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/photoCard.scss';
</style>
