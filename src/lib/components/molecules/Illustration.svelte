<script lang="ts" context="module">
	export type IllustrationImg ='pidgeon'
</script>

<script lang="ts">
	import pidgeon from '$lib/assets/pidgeon.svg?url';
	import pidgeonDark from '$lib/assets/pidgeon-dark.svg?url';
	import { isDark } from '$lib/isDark';

	export let img: IllustrationImg;
	export let background: string;

	const imgClass = 'mx-auto w-full max-w-96';
</script>

<div class="relative">
	<img
		src={background}
		class="max-h-[50vh] w-full shrink-0 fill-highlight opacity-50"
		alt="background"
	/>
	<div class="absolute top-0 w-full">
		{#if img === 'pidgeon'}
			<img src={isDark ? pidgeonDark : pidgeon} alt={img} class={imgClass} />
		{:else}
			<img src={isDark ? pidgeonDark : pidgeon} alt={img} class={imgClass} />
		{/if}
	</div>
</div>
