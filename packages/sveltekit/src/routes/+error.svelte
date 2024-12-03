<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '@michaelcuneo/svelte-components';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div class="error">
	<h1>{$page.status} {$page?.error?.message}</h1>
	<h3>Please go back to the start</h3>
	<div class="button">
		<Button type="submit" variant="outlined" onclick={() => goto('/')}>Home</Button>
	</div>
</div>

<style>
	.error {
		display: flex;
		height: calc(100vh - 120px);
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		color: white;
	}

	h3 {
		font-size: 1.5em;
		font-weight: 400;
		margin: 0 0 0.5em 0;
		color: white;
	}

	.button {
		padding: 1rem;
		border-radius: 16px;
		background: white;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
