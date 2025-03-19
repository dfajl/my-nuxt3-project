<template>
	<CommonList
		component-uniq-name="comments"
		component-uniq-type="postId"
		:data="sortedFilteredComments"
		@delete-item="deleteItem"
	/>
	<div ref="observer" style="height: 1px; width: 100%"></div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import type { Comment } from '@/types/FetchedData';
	import CommonList from '@/components/CommonList.vue';
	import { useSortedFilteredData } from '@/hooks/useSortedFilteredData';
	import { apiFetch } from '@/utils/customUseFetch';
	import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

	export type InjectedSelectValue = 'name' | 'body' | 'email' | '';

	const inputValue = inject<Ref<string | number>>('inputValue');
	const selectedValue = inject<Ref<InjectedSelectValue>>('selectedValue');

	const router = useRouter();
	const observer = ref<HTMLElement | null>(null);

	const accumComments = ref<Comment[]>([]);

	// пример использоания middleware
	definePageMeta({
		middleware: 'example',
	});

	const limit = ref(10);
	const startIndex = ref(0);

	const { data: comments, error } = await useAsyncData<Comment[]>(
		'comments',
		() =>
			$fetch('https://jsonplaceholder.typicode.com/comments', {
				params: {
					_limit: limit.value,
					_start: startIndex.value,
				},
			}),

		/*
			Вариант использования кастомного $fetch.
			Вроде, работает, но
			при ошибке в запросе почему-то вызывается дважды.
		*/

		/* apiFetch('/comments', {
				params: {
					_limit: limit.value,
					_start: startIndex.value,
				},
			}), */

		{
			watch: [limit, startIndex],
		},
	);

	watch(
		comments,
		(newComments, oldComments) => {
			console.log(newComments);
			console.log(oldComments);
			if (newComments) {
				accumComments.value = [
					...toRaw(accumComments.value),
					...toRaw(newComments),
				];
			}
		},
		/* 
			Из-за особености верстки, вызов useAsyncData сразу происходит два раза:
			c нулевым стартовым индексом и с увеличенным на 10 (из-за observer);

			Чтобы поймать первую десятку комментов, надо юзать immediate: true и
			и не использовать lazy режим. При lazy мы приходим на страницу без данных,
			первая десятка не записывается, тригерится увеличение startIndex и сразу получаем
			вторую порцию комментов.

			И в данном кейсе lazy-режим создаст много проблем при работающем 
			watch: [limit, startIndex]. Тогда придется поменять архитектуру отслеживания полностью.

			Без { immediate: true } перезагрузка сраницы не создает запрос.
		*/
		{ immediate: true },
	);

	const sortedFilteredComments = useSortedFilteredData<Comment>(
		accumComments,
		inputValue!,
		'email',
		selectedValue!,
	);

	const deleteItem = (item: Comment) => {
		if (accumComments.value) {
			accumComments.value = toRaw(accumComments.value).filter(
				(comment) => comment.id !== item.id,
			);
		}
	};

	useIntersectionObserver(observer, () => (startIndex.value += 10));

	watch(error, (value: any) => {
		if (value) {
			alert('Sorry. Something went wrong!');
			router.push('/');
			if (value instanceof Error) {
				console.error('Ошибка API:', value.message);
			}
		}
	});

	onUnmounted(() => {
		/*
			сбрасываем параметры поиска / сортировки
			при переходе на новую страницу
		*/
		if (selectedValue) {
			selectedValue.value = '';
		}
		if (inputValue) {
			inputValue.value = '';
		}
	});
</script>

<style scoped lang="scss">
	@import '@/assets/styles/uiLoading.scss';
</style>
