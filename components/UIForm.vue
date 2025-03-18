<template>
	<form @submit.prevent="handleSubmit(currentRouteForm)">
		<h4>New {{ route.path.slice(1, route.path.length - 1) }}</h4>

		<template v-if="route.name === 'users'">
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Name"
				v-model="usersForm.name"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Login"
				v-model="usersForm.username"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Email"
				v-model="usersForm.email"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Adress: street"
				v-model="usersForm.address.street"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Adress: suite"
				v-model="usersForm.address.suite"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Adress: city"
				v-model="usersForm.address.city"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Adress: zipcode"
				v-model="usersForm.address.zipcode"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Geo: latitude"
				v-model="usersForm.address.geo.lat"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Geo: longitude"
				v-model="usersForm.address.geo.lng"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Phone"
				v-model="usersForm.phone"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Website"
				v-model="usersForm.website"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Company: name"
				v-model="usersForm.company.name"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Company: catch phrase"
				v-model="usersForm.company.catchPhrase"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Company: bs"
				v-model="usersForm.company.bs"
			/>
		</template>
		<template v-if="route.name === 'comments'">
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Name"
				v-model="commentsForm.name"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Content"
				v-model="commentsForm.body"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Email"
				v-model="commentsForm.email"
			/>
		</template>
		<template v-if="route.name === 'posts'">
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Title"
				v-model="postsForm.title"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Content"
				v-model="postsForm.body"
			/>
		</template>
		<template v-if="route.name === 'photos'">
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="Title"
				v-model="photosForm.title"
			/>
			<UIInput
				class="ui-input-form"
				type="text"
				placeholder="URL"
				v-model="photosForm.url"
			/>
		</template>
		<UIButton width="50%" type="submit" height="30px">Create</UIButton>
	</form>
</template>

<script setup lang="ts">
	import UIInput from './UI/UIInput.vue';
	import UIButton from './UI/UIButton.vue';
	import type { User, Comment, Post, Photo } from '@/types/FetchedData';

	const route = useRoute();
	const router = useRouter();
	const isDialogVisible = inject<Ref<boolean>>('isDialogVisible');

	const usersForm = ref<User>({
		id: 0,
		name: '',
		username: '',
		email: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lat: '',
				lng: '',
			},
		},
		phone: '',
		website: '',
		company: {
			name: '',
			catchPhrase: '',
			bs: '',
		},
	});
	const commentsForm = ref<Comment>({
		postId: 0,
		id: 0,
		name: '',
		email: '',
		body: '',
	});
	const photosForm = ref<Photo>({
		albumId: 0,
		id: 0,
		title: '',
		url: '',
		thumbnailUrl: '',
	});
	const postsForm = ref<Post>({
		id: 0,
		body: '',
		userId: 0,
		title: '',
	});

	const currentRouteForm = computed(() => {
		if (route.name === 'users') {
			return usersForm.value;
		} else if (route.name === 'comments') {
			return commentsForm.value;
		} else if (route.name === 'posts') {
			return postsForm.value;
		} else {
			return photosForm.value;
		}
	});

	const submitForm = async (data: User | Comment | Post | Photo) => {
		try {
			const response = await $fetch.raw(
				`xhttps://jsonplaceholder.typicode.com/${String(route.name)}`,
				{
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				},
			);

			return response;
		} catch (err) {
			if (err instanceof Error) {
				console.error('Ошибка API:', err.message);
				throw err;
			}
		}
	};

	const handleSubmit = async (data: User | Comment | Post | Photo) => {
		try {
			const response = await submitForm(data);

			if (response?.status === 201) {
				alert('Data was successfully created!');
				resetForm(data);
			}
		} catch (err) {
			alert('Sorry. Something went wrong!');
			router.push('/');
		} finally {
			isDialogVisible!.value = false;
		}
	};

	const resetForm = (data: Record<string, any>) => {
		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'object' && value !== null) {
				resetForm(value); // Рекурсивная очистка вложенных объектов
			} else {
				data[key] = typeof value === 'number' ? 0 : ''; // Очистка значений
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/uiForm.scss';
</style>
