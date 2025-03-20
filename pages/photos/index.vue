<template>
	<CommonList
		component-uniq-name="photos"
		:data="sortedFilteredPhotos"
		v-if="sortedFilteredPhotos?.length"
	/>
	<UILoading v-else message="Photos loading..." />
	<div ref="observer" style="height: 1px; width: 100%"></div>

	<!-- убеждаемся, что при ошибке с клиента, запрос выполняется единожды -->
	<!-- <button @click="() => photosStore.fetchPhotos()">click</button> -->
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	import { usePhotosStore } from '@/stores/photosStore';
	import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
	import CommonList from '@/components/CommonList.vue';
	import UILoading from '@/components/UI/UILoading.vue';
	import { storeToRefs } from 'pinia';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';
	import type { Photo } from '@/types/FetchedData';

	export type InjectedSelectValue = 'title' | 'url' | '';

	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const router = useRouter();
	const photosStore = usePhotosStore();

	const { photos, fetchError } = storeToRefs(photosStore);

	const observer = ref<HTMLElement | null>(null);

	console.log('BEFORE CALL_ONCE');

	await callOnce(photosStore.fetchPhotos);
	/* await callOnce(() => photosStore.fetchPhotos()); */

	/* 
		При жесткой перезагрузке страницы данные в pinia не будут загружены
		повторно. Поэтому при монтировки делаем проверку. Видимо, так работает pinia.
		С useState нет такой ерунды.
	*/

	/* 
		Обрати внимание на то, что код выполняется последовательно (несмотя на await callOnce).

		Если вотчер будет ДО await callOnce, то он зарегистрируется на сервере с пустой ошибкой, но не выполнится (на ssr нет реактивности). Потом упадет ошибка вызова. И при монтировке вотчер отработает дважды: один раз из-за того, что ошибка, записанная на сервере в зарегестрированном вотчере обновится и "отложенная" реактивность выполнится на клиенте.
		Второй вызов - уже после повторного вызова в хуке onMounted, т.к. данные на клиент не пришли с сервера.

		=> Вотчер располагаем ПОСЛЕ await callOnce. И он сработает только в случае ошибки вызова, сделанного уже на клиенте.

		А срабатывает вотчер при onMounted потому, что присваивается новый объект Error. А сравнение объектов идет по ссылке.
	*/

	const sortedFilteredPhotos = useSortedFilteredData<Photo>(
		photos,
		inputValue!,
		'url',
		selectedValue!,
	);

	watch(fetchError, (value) => {
		console.log('WATCHER');
		if (value) {
			alert(value.message);
			router.push('/');
		}
	});

	onMounted(() => {
		if (!photos.value.length) {
			photosStore.fetchPhotos();
		}
	});

	useIntersectionObserver(observer, () =>
		photosStore.incrementStartIndex(10),
	);

	console.log('AFTER CALL_ONCE');

	onUnmounted(() => {
		/* 
			сбрасываем параметры поиска / сортировки 
			при переходе на новую страницу 
		*/
		if (selectedValue) {
			selectedValue.value = '';
		}
		if (inputValue) {
			inputValue.value = '';
		}
	});
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
