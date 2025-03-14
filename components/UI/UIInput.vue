<template>
	<input
		v-bind="$attrs"
		:type="type"
		:placeholder="placeholder"
		v-model="modelValue"
		class="ui-input"
	/>
	<!--
		под капотом v-model:
			принимаем пропс и эмитим событие обновления пропса
			const props = defineProps(['modelValue'])
			const emit = defineEmits(['update:modelValue'])

			в шаблоне по событию input эмитим наверх новое значение
			<input
				:value="props.modelValue"
				@input="emit('update:modelValue', $event.target.value)"
			/>

			в родителе слушаем событие @update:modelValue и обновляем модель
			:modelValue="foo"
  			@update:modelValue="$event => (foo = $event)"
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
	@import '@/assets/styles/uiInput.scss';
</style>
