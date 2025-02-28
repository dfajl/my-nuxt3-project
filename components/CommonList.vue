<template>
	<div class="list_wrapper">
		<ListItem
			v-for="item in data"
			:key="item.id"
			:component-uniq-name="componentUniqName"
			:item="item"
			:component-uniq-type="componentUniqType"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { Comment, User, Post } from '@/types/FetchedData';
	import ListItem from '@/components/ListItem.vue';

	const props = defineProps<{
		componentUniqName: string;
		componentUniqType: 'username' | 'postId' | 'userId';
		data: User[] | Comment[] | Post[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/listWrapper.scss';
</style>
