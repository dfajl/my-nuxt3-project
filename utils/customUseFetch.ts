export const apiFetch = $fetch.create({
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
