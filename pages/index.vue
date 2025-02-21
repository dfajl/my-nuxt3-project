<template>
	<div class="main_container">
		<h1>Welcome Nuxt 3 page!</h1>
		<div class="nuxt_logo_container">
			<img
				class="nuxt_logo"
				src="@/assets/images/icons/icon-nuxt.svg"
				alt="Логотип Nuxt"
			/>
		</div>
	</div>
	<img
		class="main_background overlay"
		:src="mainBackground"
		alt="mainBackground"
	/>
</template>

<script setup lang="ts">
	import mainBackground from '@/assets/images/backgrounds/background_main.jpg';
</script>

<style scoped lang="scss">
	@import '@/assets/styles/indexPage.scss';
</style>
