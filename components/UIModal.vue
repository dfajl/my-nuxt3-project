<template>
	<div class="dialog" v-if="show" @click="showModel = false">
		<div @click.stop class="dialog__content">
			<slot name="mainContent">
				<span> There is no passed content </span>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	const showModel = defineModel('show');
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiModal.scss';
</style>
