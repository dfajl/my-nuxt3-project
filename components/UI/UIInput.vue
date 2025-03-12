<template>
	<input
		v-bind="$attrs"
		:type="type"
		:placeholder="placeholder"
		v-model="modelValue"
		class="ui-input"
	/>
	<!--
		под капотом v-model
	 	:value="modelValue"
		@input="modelValue = ($event.target as HTMLInputElement).value" 
	-->
</template>

<script setup lang="ts">
	const props = defineProps<{
		type?: string;
		placeholder?: string;
	}>();

	const modelValue = defineModel<string | number>();
</script>

<style scoped lang="scss">
	.ui-input {
		width: 30%;
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		background: #bae7f671;
		box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3);
		color: black;
	}
</style>
