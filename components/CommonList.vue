<template>
	<div class="list_wrapper">
		<component :is="component" :items="data" />
	</div>
</template>

<script setup lang="ts">
	import type { Comment, User } from '@/types/FetchedData';

	const props = defineProps<{
		component: Component;
		data: User[] | Comment[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/listWrapper.scss';
</style>
