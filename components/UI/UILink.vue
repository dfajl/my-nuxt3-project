<template>
	<NuxtLink :to="path" class="general-link"> {{ pageName }} </NuxtLink>
</template>

<script setup lang="ts">
	const props = defineProps<{
		pageName: string;
		path: string;
	}>();
</script>

<style lang="scss" scoped>
	.general-link {
		text-decoration: none;
	}
</style>
