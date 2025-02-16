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
	@import '@/assets/styles/uiNavBar.scss';
</style>
