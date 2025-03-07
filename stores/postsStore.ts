import type { Post } from '@/types/FetchedData';
import { apiFetch } from '@/utils/customUseFetch';

export const usePostsState = () => {
	const posts = useState<Post[]>('posts', () => []);
	const error = useState<Error | null>('errorFetchPosts', () => null);

	const fetchPosts = async () => {
		try {
			if (!posts.value.length) {
				posts.value = await $fetch(
					'https://jsonplaceholder.typicode.com/posts',
				);
			}
			error.value = null;
		} catch (err) {
			error.value = err as Error;
			if (err instanceof Error) {
				console.error('Ошибка API:', err.message);
			}
		}
		/* posts.value = await apiFetch('/posts'); */
		/* Вариант использования кастомного $fetch. 
			Вроде, работает, но
			при ошибке в запросе почему-то вызывается дважды. 
		*/
	};

	if (error.value) {
		/* 
			Принудительный вызов фетча на случай, если при первом запуске упала ошибка
			и мы пошли сюда повторно
		*/
		fetchPosts();
	} else {
		callOnce(fetchPosts);
	}

	return { posts, error };
};
