import { ref, watch, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(
	targetRef: Ref<HTMLElement | null>,
	callback: () => void,
	options = { rootMargin: '10px', threshold: 1.0 },
) {
	const observer = ref<IntersectionObserver | null>(null);

	onMounted(() => {
		if (!targetRef?.value) return;

		observer.value = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				callback();
				console.log('Load new data...');
			}
		}, options);

		observer.value.observe(targetRef?.value);
	});

	onUnmounted(() => {
		if (observer.value) {
			observer.value.disconnect();
		}
	});

	// Позволяем переинициализировать наблюдение, если targetRef меняется
	watch(targetRef, (newEl, oldEl) => {
		if (observer.value && oldEl) observer.value.unobserve(oldEl);
		if (observer.value && newEl) observer.value.observe(newEl);
	});

	return { observer };
}
