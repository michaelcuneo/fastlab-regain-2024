<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import Card, { Content } from '@smui/card';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';

	onMount(() => {
		user.set(data);
	});

	let { data }: { data: any } = $props();
</script>

<div class="wrapper">
	<Card>
		<Content>
			<h5>Successfully Logged in...</h5>
			<p>Click here to go and set up your regain, or wait 5 seconds and you will redirected to either the onboarding experience, or your scheduled progress.</p>
			<Button variant="raised" onclick={() => goto('/')}>Next</Button>
		</Content>
	</Card>
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		width: 100vw;
		z-index: 0;
	}
</style>
