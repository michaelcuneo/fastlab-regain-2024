<script lang="ts">
	import { page } from '$app/stores';
	import Button from '@smui/button';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div class="error">
	<h1>{$page.status} {$page?.error?.message}</h1>
	<h3>Please go back to the start</h3>
	<Button type="submit" variant="raised" onclick={() => goto('/')}>Home</Button>
</div>

<style>
	.error {
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.1);
	}
	h1, h3 {
		color: white;
	}
</style>
