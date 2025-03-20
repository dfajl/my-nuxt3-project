import type { Post } from '@/types/FetchedData';
import { apiFetch } from '@/utils/customUseFetch';

export const usePosts = () => {
	const router = useRouter();

	const limit = ref(10);
	const startIndex = ref(0);

	const fetchPosts = async () => {
		try {
			const data = await $fetch<Post[]>(
				'https://jsonplaceholder.typicode.com/posts',
				{
					params: {
						_limit: limit.value,
						_start: startIndex.value,
					},
				},
			);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				console.error('Ошибка API:', err.message);
				alert('Sorry. Something went wrong!');
				router.push('/');
			}
		}
		/* posts.value = await apiFetch('/posts'); */
		/* Вариант использования кастомного $fetch. 
			Вроде, работает, но
			при ошибке в запросе почему-то вызывается дважды. 
		*/
	};

	function incrementStartIndex(incrementedValue: number) {
		startIndex.value = incrementedValue + startIndex.value;
	}

	return {
		fetchPosts,
		incrementStartIndex,
		startIndex,
		limit,
	};
};
