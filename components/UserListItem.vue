<template>
	<div
		class="user-item"
		v-for="user in users"
		:key="user.id"
		@click="navigateToUser(user.id)"
	>
		{{ user.name }}
	</div>
</template>

<script setup lang="ts">
	import type { User } from '@/types/Users';
	import { useRouter } from 'vue-router';

	const props = defineProps<{
		users: User[];
	}>();

	const router = useRouter();

	const navigateToUser = (id: string | number) => {
		router.push(`/users/${id}`);
	};
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userListItem.scss';
</style>
