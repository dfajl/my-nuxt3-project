<template>
	<div
		:class="`${componentUniqName}-item`"
		v-for="item in items"
		:key="item.id"
		@click="navigateToUser(item.id)"
	>
		<div v-if="componentUniqName === 'users'">{{ item.name }}</div>
		<div v-else-if="componentUniqName === 'comments'">
			Comment ID - {{ item.id }}
			<br />
			Comment email - {{ item.email }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { User, Comment } from '@/types/FetchedData';
	import { useRouter } from 'vue-router';

	const props = defineProps<{
		componentUniqName: string;
		items: User[] | Comment[];
	}>();

	const router = useRouter();

	const navigateToUser = (id: string | number) => {
		router.push(`/${props.componentUniqName}/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userListItem.scss';
	@import '@/assets/styles/commentListItem.scss';
</style>
