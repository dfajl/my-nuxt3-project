<template>
	<div class="ui-components-wrapper" v-if="isNeedfulPath">
		<UIInput v-model="inputValue" placeholder="Search..." />
		<UISelect v-model="selectedValue" :options="sortOptions" />
		<UIButton
			width="20%"
			height="100%"
			class="layoutBtn"
			@click="isDialogVisible = true"
		>
			Create new {{ route.path.slice(1) }}
		</UIButton>
	</div>
	<UIModal v-model:show="isDialogVisible">
		<template #mainContent>
			<UIForm />
		</template>
	</UIModal>
	<slot />
</template>

<script setup lang="ts">
	import UIInput from '@/components/UI/UIInput.vue';
	import UISelect from '@/components/UI/UISelect.vue';
	import UIButton from '@/components/UI/UIButton.vue';
	import UIModal from '@/components/UIModal.vue';

	import { useRoute } from 'vue-router';
	const route = useRoute();

	const inputValue = ref('');
	const selectedValue = ref('');
	const isDialogVisible = ref<boolean>(false);

	provide('inputValue', inputValue);
	provide('selectedValue', selectedValue);
	provide('isDialogVisible', isDialogVisible);

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
	@import '@/assets/styles/defaultLayout.scss';
</style>
