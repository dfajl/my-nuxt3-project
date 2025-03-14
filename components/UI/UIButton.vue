<template>
	<button
		class="ui-btn"
		:class="{ bold: isBoldFont }"
		:style="`margin-bottom: ${marginBottom};`"
	>
		<slot> Click </slot>
	</button>
</template>

<script setup lang="ts">
	withDefaults(
		defineProps<{
			isBoldFont?: boolean;
			marginBottom?: string;
			width: string;
			height?: string;
		}>(),
		{
			isBoldFont: false,
			marginBottom: '0px',
		},
	);
</script>

<style lang="scss" scoped>
	.ui-btn {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Montserrat', sans-serif;
		font-weight: 500;
		padding: 2px;
		background: rgba(91, 91, 91, 0.482);
		margin: 0;
		width: v-bind(width); // биндинг пропса
		height: v-bind(height); // биндинг пропса
		border-radius: 5px;
		transition: 0.3s linear;
		&:hover {
			cursor: pointer;
			background: #98e5ffbe;
		}
	}
	.bold {
		font-weight: bold;
	}
</style>
