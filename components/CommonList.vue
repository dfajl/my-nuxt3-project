<template>
	<div class="list_wrapper">
		<ListItem :component-uniq-name="componentUniqName" :items="data" />
	</div>
</template>

<script setup lang="ts">
	import type { Comment, User } from '@/types/FetchedData';
	import ListItem from '@/components/ListItem.vue';

	const props = defineProps<{
		componentUniqName: string;
		data: User[] | Comment[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/listWrapper.scss';
</style>
