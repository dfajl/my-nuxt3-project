import { defineStore } from 'pinia';
import type { Photo } from '@/types/FetchedData';

export const usePhotosStore = defineStore('photosStore', () => {
	const photos: Ref<Photo[]> = ref([]);
	const limit = ref(5);
	const startIndex = ref(0);
	const fetchError: Ref<null | Error> = ref(null);

	async function fetchPhotos() {
		try {
			const data = await $fetch<Photo[]>(
				'https://jsonplaceholder.typicode.com/photos',
				{
					params: {
						_limit: limit.value,
						_start: startIndex.value,
					},
				},
			);
			console.log('CALLED_OK');
			photos.value = data;
		} catch (error: unknown) {
			console.log('CALLED');
			if (error instanceof Error) {
				fetchError.value = error;
			}
		}
	}

	function incrementStartIndex(incrementedValue: number) {
		startIndex.value = incrementedValue + startIndex.value;
	}

	watch(startIndex, (value) => {
		if (value) {
			fetchPhotos();
		}
	});

	return {
		photos,
		limit,
		startIndex,
		fetchError,
		fetchPhotos,
		incrementStartIndex,
	};
});
