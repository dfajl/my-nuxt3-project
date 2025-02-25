<template>
	<nav>
		<div class="left-anchor">
			<UILink pageName="Main" path="/" />
		</div>

		<div class="right-anchors">
			<UILink pageName="Users" path="/users" activeClass="active" />
			<UILink pageName="Comments" path="/comments" activeClass="active" />
		</div>
	</nav>
</template>
<script setup lang="ts">
	import UILink from '@/components/UI/UILink.vue';
</script>
<style scoped lang="scss">
	@import '@/assets/styles/uiNavBar.scss';
</style>
