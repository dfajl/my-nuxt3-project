<template>
	<div>
		<p>Это комменты юзера</p>
	</div>
</template>

<script setup lang="ts">
	// пример использоания параметров маршрута
	const route = useRoute();
	console.log(route);

	// пример использоания middleware
	definePageMeta({
		middleware: 'example',
	});
</script>

<style scoped>
	h1 {
		color: #42b983;
	}
</style>
