<template>
	<CommonList
		component-uniq-name="photos"
		:data="photos"
		v-if="photos?.length"
	/>
	<UILoading v-else message="Photos loading..." />

	<!-- проверка реактивности стора -->
	<!-- <button @click="photosStore.incrementStartIndex(10)">click</button> -->

	<!-- убеждаемся, что при ошибке с клиента, запрос выполняется единожды -->
	<!-- <button @click="() => photosStore.fetchPhotos()">click</button> -->
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
	*/

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

	console.log('AFTER CALL_ONCE');
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiLoading.scss';
</style>
