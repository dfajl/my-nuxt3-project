<template>
	<!-- <div v-if="currentUser" :user="currentUser"> comment with id:{{ route.params.id }} </div>
	<span v-else>Nothing to render!</span> -->
</template>

<script setup lang="ts">
	const route = useRoute();
	const router = useRouter();

	// достаем данные из кэша
	/* const { data: users } = useNuxtData('users'); */

	/* const currentUser: User = users.value?.find(
		(user: User) => String(user.id) === route.params.id,
	);

	if (!currentUser) {
		router.push('/user-list');
	} */
</script>

<style scoped lang="scss">
	/* @import '@/assets/styles/userProfile.scss'; */
</style>
