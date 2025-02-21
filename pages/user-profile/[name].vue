<template>
	<div>
		<p>Это инфо про юзера {{ name }}</p>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute();
	const name = (route.params.name as string).replace(/\_/g, ' ');
</script>

<style scoped>
	h1 {
		color: #42b983;
	}
</style>
