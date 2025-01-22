<script lang="ts">
	import type { PageServerData } from './$types';
	import background from '$lib/images/background.jpeg';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';
	import Card, { Content } from '@smui/card';

	$effect(() => {
		console.log(data);
	});

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>Regain Home</title>
</svelte:head>

<div class="welcome" style="background-image: url({background})">
	<Card>
		<Content>
			{#if data.authenticated}
				<Button variant="raised" onclick={() => goto('/settings')}>START TO REGAIN</Button>
			{:else}
				<Button variant="raised" onclick={() => goto('/auth/login')}>START TO REGAIN</Button
				>
			{/if}
		</Content>
	</Card>
</div>

<style>
	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rem;
		width: 100%;
		height: calc(100vh - 4rem - 140px);
		background-repeat: no-repeat;
		background-size: cover;
		justify-content: end;
	}
</style>
