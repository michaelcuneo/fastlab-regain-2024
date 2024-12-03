<script lang="ts">
	import Overlay from '$lib/components/Overlay.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import './reset.css';
	import './styles.css';
	import { isLanding } from '$lib/utils/store';

	let { children }: { children: any } = $props();
</script>

<div class="root">
	<Overlay />
	{#if $isLanding === false}
		<Nav />
	{/if}
	{@render children?.()}
</div>

<style>
	.root {
		min-height: 100%;
		background: #132a13;
	}
</style>
