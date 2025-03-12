<template>
	<select v-bind="$attrs" v-model="modelValue" class="ui-select">
		<option
			v-for="option in options[route.name as keyof typeof options]"
			:key="option.value"
			:value="option.value"
		>
			{{ option.name }}
		</option>
	</select>
</template>

<script setup lang="ts">
	const route = useRoute();
	const props = defineProps<{
		options: {
			users: { name: string; value: string | number }[];
		};
	}>();

	const modelValue = defineModel<string | number>();
</script>

<style scoped lang="scss">
	.ui-select {
		width: 30%;
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		background: #bae7f671;
		box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3);
		color: black;
		cursor: pointer;
	}
</style>
