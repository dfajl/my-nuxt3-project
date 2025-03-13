import { defineStore } from 'pinia';
import type { Photo } from '@/types/FetchedData';

export const usePhotosStore = defineStore('photosStore', () => {
	console.log('PINIA_PHOTOS_INIT');
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

			/* 
				const fetchedPhotos = data.reduce(
					(accum, photo) => {
						accum.push(photo);
						return accum;
					},
					[...photos.value],
				);
				photos.value = fetchedPhotos; 

				reduce явно избыточен. Лучше spread или concat
			*/

			/* photos.value = [...photos.value, ...data]; */

			if (photos.value.length) {
				photos.value = toRaw(photos.value).concat(data);
			} else {
				photos.value = data;
			}
		} catch (error: unknown) {
			console.log('CALLED_ERROR');
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
