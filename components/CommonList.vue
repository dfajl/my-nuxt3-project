<template>
	<div class="list_wrapper">
		<ListItem
			v-for="item in data"
			:key="item.id"
			:component-uniq-name="componentUniqName"
			:item="item"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { Comment, User, Post, Photo } from '@/types/FetchedData';
	import ListItem from '@/components/ListItem.vue';

	const props = defineProps<{
		componentUniqName: 'users' | 'comments' | 'posts' | 'photos';
		data: User[] | Comment[] | Post[] | Photo[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/listWrapper.scss';
</style>
