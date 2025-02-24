<template>
	<div class="user-list_wrapper">
		<UserListItem :users="users" />
	</div>
</template>

<script setup lang="ts">
	import type { User } from '@/types/Users';
	import UserListItem from '@/components/UserListItem.vue';

	const props = defineProps<{
		users: User[];
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userList.scss';
</style>
