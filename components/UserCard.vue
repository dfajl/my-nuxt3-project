<template>
	<div class="user-card">
		<div class="user-details">
			<h2 class="user-name">{{ user.name }}</h2>
			<p class="user-username">@{{ user.username }}</p>
			<p class="user-email">{{ user.email }}</p>

			<div class="user-info">
				<p><strong>Телефон:</strong> {{ user.phone }}</p>
				<p>
					<strong>Сайт:</strong>
					<a :href="'https://' + user.website" target="_blank">{{
						user.website
					}}</a>
				</p>
			</div>

			<div class="user-address">
				<h3>Адрес</h3>
				<p>{{ user.address.street }}, {{ user.address.suite }}</p>
				<p>{{ user.address.city }}, {{ user.address.zipcode }}</p>
			</div>

			<div class="user-company">
				<h3>Компания</h3>
				<p>
					<strong>{{ user.company.name }}</strong>
				</p>
				<p>{{ user.company.catchPhrase }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { User } from '@/types/Users';

	const props = defineProps<{
		user: User;
	}>();
</script>

<style scoped lang="scss">
	@import '@/assets/styles/userProfile.scss';
</style>
