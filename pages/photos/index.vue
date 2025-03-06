<template>
	<CommonList
		component-uniq-name="photos"
		:data="photos"
		v-if="photos?.length"
	/>
	<UILoading v-else message="Photos loading..." />

	<!-- проверка реактивности стора -->
	<button @click="photosStore.incrementStartIndex(10)">click</button>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	import { usePhotosStore } from '@/stores/photosStore';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { storeToRefs } from 'pinia';

	const router = useRouter();

	const photosStore = usePhotosStore();
	const { photos, startIndex, fetchError } = storeToRefs(photosStore);

	await callOnce(photosStore.fetchPhotos);

	onMounted(() => {
		if (!photos.value.length) {
			photosStore.fetchPhotos();
		}
	});

	watch(fetchError, (value) => {
		if (value) {
			alert(value.message);
			router.push('/');
		}
	});
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
