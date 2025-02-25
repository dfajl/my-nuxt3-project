import { defineNuxtPlugin, NuxtApp } from '#app';
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
	const pinia = createPinia();
	nuxtApp.vueApp.use(pinia);
});
