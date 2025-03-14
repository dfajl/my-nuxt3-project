<template>
	<div class="ui-inputs-wrapper" v-if="isNeedfulPath">
		<UIInput v-model="inputValue" placeholder="Search..." />
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

	const isNeedfulPath = computed(() => {
		return (
			route.path === '/users' ||
			route.path === '/comments' ||
			route.path === '/posts' ||
			route.path === '/photos'
		);
	});

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
		photos: [
			{
				value: 'title',
				name: 'По заголовку',
			},
			{
				value: 'url',
				name: 'По URL',
			},
			{
				value: '',
				name: 'Без сортировки',
			},
		],
		posts: [
			{
				value: 'title',
				name: 'По заголовку',
			},
			{
				value: 'body',
				name: 'По содержанию',
			},
			{
				value: '',
				name: 'Без сортировки',
			},
		],
		comments: [
			{
				value: 'name',
				name: 'По названию',
			},
			{
				value: 'email',
				name: 'По почте',
			},
			{
				value: 'body',
				name: 'По содержанию',
			},
			{
				value: '',
				name: 'Без сортировки',
			},
		],
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
