export default defineNuxtRouteMiddleware((to, from) => {
	if (typeof window !== 'undefined' && window.innerWidth < 768) {
		return navigateTo('/');
	}
});
