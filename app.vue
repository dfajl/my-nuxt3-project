<template>
	<div>
		<NuxtRouteAnnouncer />
		<nav>
			<NuxtLink to="/">Главная</NuxtLink>
			<NuxtLink to="/welcome">Страница Приветствия</NuxtLink>
		</nav>
		<NuxtPage />
	</div>
</template>

<script setup>
// Здесь можно добавлять реактивные переменные и функции, если это необходимо
</script>

<style scoped>
nav {
	margin-bottom: 20px;
}
</style>
