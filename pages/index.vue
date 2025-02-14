<template>
	<div>
		<h1>Добро пожаловать на главную страницу!</h1>
		<p>Это ваше приложение на Nuxt!</p>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '../stores/exampleStore';
	import { computed } from 'vue';

	const userStore = useUserStore();

	const login = () => {
		userStore.setUser({ username: 'example' });
	};

	const logout = () => {
		userStore.logout();
	};

	// Получаем данные из Store
	const user = computed(() => userStore.user);
	const isLoggedIn = computed(() => userStore.isLoggedIn);
	const number = computed(() => userStore.number);
	console.log(number);
</script>

<style scoped>
	h1 {
		color: #42b983;
	}
</style>
