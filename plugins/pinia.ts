import { defineNuxtPlugin, NuxtApp } from '#app';
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
	console.log('PINIA CREATED');
	const pinia = createPinia();
	nuxtApp.vueApp.use(pinia);
});
