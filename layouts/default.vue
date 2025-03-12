<template>
	<div class="ui-inputs-wrapper">
		<UIInput
			v-if="route.path !== '/'"
			v-model="inputValue"
			placeholder="Search..."
		/>
		<UISelect v-model="selectedValue" :options="sortOptions" />
	</div>
	<slot />
</template>

<script setup lang="ts">
	import UIInput from '@/components/UI/UIInput.vue';
	import UISelect from '@/components/UI/UISelect.vue';

	import { useRoute } from 'vue-router';
	const route = useRoute();

	const inputValue = ref('');
	const selectedValue = ref('');
	provide('inputValue', inputValue);
	provide('selectedValue', selectedValue);

	const sortOptions = {
		users: [
			{
				value: 'name',
				name: 'По имени',
			},
			{
				value: 'username',
				name: 'По никнейму',
			},
			{
				value: 'email',
				name: 'По почте',
			},
			{
				value: '',
				name: 'Без сортировки',
			},
		],
		/* photos: [],
		posts: [],
		comments: [], */
	};
</script>

<style lang="scss" scoped>
	.ui-inputs-wrapper {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 20px;
		width: 90%;
		padding: 5px;
		border-radius: 5px;
		margin-left: 15px;
	}
</style>
