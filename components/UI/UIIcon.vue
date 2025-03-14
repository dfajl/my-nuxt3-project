<template>
	<component :is="isSvg ? 'img' : 'i'" v-bind="computedProps" class="ui-icon">
		<slot v-if="!isSvg"></slot>
	</component>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = withDefaults(
		defineProps<{
			name?: string;
			src?: string;
			size?: string;
			color?: string;
		}>(),
		{
			size: '16px',
			color: 'black',
		},
	);

	const isSvg = computed(() => !!props.src);

	const computedProps = computed(() => {
		if (isSvg.value) {
			return {
				src: props.src,
				alt: props.name || 'icon',
				style: {
					width: props.size,
					height: props.size,
					color: props.color,
				},
			};
		} else {
			return {
				class: props.name,
				style: { fontSize: props.size, color: props.color },
			};
		}
	});
</script>

<style scoped>
	.ui-icon {
		display: inline-block;
		vertical-align: middle;
	}
</style>
