<script lang="ts">
	import Landing from '$lib/components/Landing.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import { isLanding } from '$lib/helpers/store';
</script>

<svelte:head>
	<title>Regain Home</title>
</svelte:head>

<div class="wrapper">
	{#if $isLanding === true}
		<Landing />
	{:else if $isLanding === false}
		<Welcome />
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		height: calc(100vh - 88px);
	}
</style>
