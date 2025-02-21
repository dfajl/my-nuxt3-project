<template>
	<div class="user-list_wrappepr">
		<div
			class="user-item"
			v-for="user in users"
			key="user.id"
			v-if="status === 'success'"
			@click="navigateToUser(user.name)"
		>
			{{ user.name }}
		</div>
		<span v-esle>Loading...</span>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const {
		data: users,
		status,
		execute,
	} = await useFetch('https://jsonplaceholder.typicode.com/users', {
		lazy: true,
	});

	const navigateToUser = (name: string) => {
		const editedParam = name.replace(/\s+/g, '_');
		router.push(`/user-profile/${editedParam}`);
	};
</script>

<style scoped lang="scss">
	.user-list_wrappepr {
		margin: 0 auto;
		padding: 50px;
		width: 70%;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		gap: 10px;
		.user-item {
			display: flex;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 50px;
			border: 1px solid grey;
			cursor: pointer;
			transition: 0.3s;
			border-radius: 10px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
			&:hover {
				background: #00000043;
				box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>
