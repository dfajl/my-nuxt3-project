<template>
	<nav>
		<div class="left-anchor">
			<NuxtLink to="/">Main</NuxtLink>
		</div>

		<div class="right-anchors">
			<NuxtLink to="/user-list" activeClass="active">User list</NuxtLink>
			<NuxtLink to="/user-comment" activeClass="active"
				>User comment</NuxtLink
			>
		</div>
	</nav>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
	@import '@/assets/styles/uiNavBar.scss';
</style>
