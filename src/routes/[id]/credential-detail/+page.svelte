<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';

	export let data: any;
	const { credential } = data;
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>
			<div class="flex items-center gap-2">
				<Logo />
				<h1 class="text-2xl">Credential detail</h1>
			</div>
		</ion-title>
	</ion-toolbar>
</ion-header>
<ion-content fullscreen class="ion-padding">
	<d-credential-card {...credential} expiration-date="2017-01-01" verified="false"> </d-credential-card>
	<div class="fixed w-full bottom-0 left-0 bg-tab">
		<d-credential-detail {...credential} description={credential.expand.templates[0].name} href={`/${credential.id}/verify/`} />
	</div>
</ion-content>
