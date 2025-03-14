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
	@import '@/assets/styles/uiSelect.scss';
</style>
