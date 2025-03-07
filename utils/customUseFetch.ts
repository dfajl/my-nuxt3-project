export const apiFetch = $fetch.create({
	/* TO DO! Почему-то, если запрос падает с ошибкой, то эти обработчики срабатывают два раза */

	baseURL: 'https://jsonplaceholder.typicode.com',

	onRequest({ request }) {
		console.log('🚀 Отправка запроса:', request);
	},

	onResponse({ response }) {
		console.log('✅ Ответ получен:', response.status);
	},

	onRequestError({ error }) {
		console.error('❌ Ошибка запроса:', error);
		alert('Sorry. Something went wrong!');

		/* Is correct? */
		navigateTo('/');
	},

	onResponseError({ response }) {
		console.error('🔒 ', response);
	},
});
