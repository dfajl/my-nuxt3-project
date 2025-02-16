<template>
	<div class="main_container">
		<h1>Добро пожаловать на главную страницу!</h1>
		<p>Это ваше приложение на Nuxt!</p>
	</div>
	<img
		class="main_background overlay"
		:src="mainBackground"
		alt="mainBackground"
	/>
</template>

<script setup lang="ts">
	import { useUserStore } from '@/stores/exampleStore';
	import mainBackground from '@/assets/images/backgrounds/background_main.jpg';

	console.log(mainBackground);

	const userStore = useUserStore();

	// Получаем данные из Store
	const user = computed(() => userStore.user);
	const isLoggedIn = computed(() => userStore.isLoggedIn);
	const number = computed(() => userStore.number);
	console.log(number.value);
</script>

<style scoped lang="scss">
	@import '@/assets/styles/indexPage.scss';
</style>
