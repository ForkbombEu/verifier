<script lang="ts">
	import Header from '$lib/components/atoms/Header.svelte';
	export let data: any;
	const { credential } = data;
</script>

<Header>CREDENTIAL DETAIL</Header>
<ion-content fullscreen class="ion-padding">
	<d-credential-card {...credential} expiration-date="2017-01-01" verified="false"> </d-credential-card>
	<div class="fixed w-full bottom-0 left-0 bg-tab">
		<d-credential-detail {...credential} description={credential.expand.templates[0].name} href={`/${credential.id}/verify/`} />
	</div>
</ion-content>
