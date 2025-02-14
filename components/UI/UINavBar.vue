<template>
	<nav>
		<NuxtLink to="/">Main</NuxtLink>
		<NuxtLink to="/user-list" activeClass="active">User list</NuxtLink>
		<NuxtLink to="/user-profile" activeClass="active">User info</NuxtLink>
		<NuxtLink to="/user-comment" activeClass="active"
			>User comment</NuxtLink
		>
	</nav>
</template>
<script setup lang="ts">
	// Здесь можно добавить логику, если необходимо
</script>
<style scoped lang="scss">
	nav {
		display: flex;
		justify-content: start;
		align-items: center;
		margin-bottom: 20px;
		gap: 30px;
		padding: 20px;
		width: 100%;

		a:first-child {
			margin-right: 40%;
			background: #00bfff;
		}

		a {
			background: #98e5ff;
			display: flex;
			padding: 10px;
			border-radius: 10px;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			color: #000000;
			box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3);
			transition: 0.3s;

			&:hover {
				background: #bae7f6;
			}
		}

		.active {
			background: #bae7f671;
			transition: 0.1s;
			color: #848484;
		}
	}
</style>
