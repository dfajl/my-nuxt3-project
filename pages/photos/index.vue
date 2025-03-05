<template>
	<pre v-if="photos.length">{{ photos }}</pre>
	<span v-else>Loading...</span>
	<button @click="startIndex += 10">click</button>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { usePhotosStore } from '@/stores/photosStore';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { storeToRefs } from 'pinia';

	const router = useRouter();
	const photosStore = usePhotosStore();
	const { photos, startIndex } = storeToRefs(photosStore);

	await callOnce(photosStore.fetchPhotos);

	onMounted(() => {
		if (!photos.value.length) {
			photosStore.fetchPhotos();
		}
	});
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
