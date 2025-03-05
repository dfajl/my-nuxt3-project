import { defineStore } from 'pinia';
import type { Photo } from '@/types/FetchedData';

export const usePhotosStore = defineStore('photosStore', () => {
	const photos: Ref<Photo[]> = ref([]);
	const limit = ref(5);
	const startIndex = ref(0);

	async function fetchPhotos() {
		const data = await $fetch<Photo[]>(
			'https://jsonplaceholder.typicode.com/photos',
			{
				params: {
					_limit: limit.value,
					_start: startIndex.value,
				},
			},
		);
		photos.value = data;
	}

	watch(startIndex, (value) => {
		if (value) {
			fetchPhotos();
		}
	});

	return { photos, limit, startIndex, fetchPhotos };
});
