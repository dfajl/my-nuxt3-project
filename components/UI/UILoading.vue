<template>
	<div class="loading">{{ message }}</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		message: string;
	}>();
</script>

<style lang="scss" scoped>
	.loading {
		width: 100%;
		height: 200px;
		padding: 50px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
