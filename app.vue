<template>
	<div>
		<NuxtRouteAnnouncer />
		<UINavBar />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
	import UINavBar from '@/components/UI/UINavBar.vue';
</script>

<style>
	body {
		font-family: 'Montserrat', sans-serif;
		background: #bccdcfb3;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
